import React, { useState, useEffect } from 'react';
import { skillCategories, topLanguages as staticTopLanguages } from '../data/skills';
import { fetchTopLanguages } from '../utils/githubApi';

function SkillBar({ skill }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span className="font-medium text-[#1f2328]">{skill.name}</span>
        <span className="text-[#656d76]">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-[#eaeef2] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
        />
      </div>
    </div>
  );
}

function LanguageBar({ languages }) {
  return (
    <div>
      <div className="flex rounded-full overflow-hidden h-2.5 mb-2">
        {languages.map((lang) => (
          <div
            key={lang.name}
            style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
            title={`${lang.name}: ${lang.percent}%`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5 text-xs text-[#656d76]">
            <span className="lang-dot" style={{ backgroundColor: lang.color }} />
            <span className="font-medium text-[#1f2328]">{lang.name}</span>
            <span>{lang.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [topLanguages, setTopLanguages] = useState(staticTopLanguages);
  const [isLangLoading, setIsLangLoading] = useState(true);
  const [langError, setLangError] = useState('');
  const current = skillCategories.find((c) => c.id === activeCategory);

  useEffect(() => {
    let mounted = true;

    const loadTopLanguages = async () => {
      try {
        setIsLangLoading(true);
        setLangError('');
        const langs = await fetchTopLanguages(7);
        if (mounted && langs.length > 0) {
          setTopLanguages(langs);
        }
      } catch (err) {
        if (mounted) setLangError(err.message || 'Unable to fetch top languages');
      } finally {
        if (mounted) setIsLangLoading(false);
      }
    };

    loadTopLanguages();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Languages */}
      <div className="border border-[#d0d7de] rounded-lg p-5 bg-white">
        <h3 className="text-sm font-semibold text-[#1f2328] mb-4">Top Languages</h3>
        {isLangLoading ? (
          <p className="text-xs text-[#656d76]">Loading top languages...</p>
        ) : langError ? (
          <p className="text-xs text-red-600 dark:text-red-400">{langError}</p>
        ) : (
          <LanguageBar languages={topLanguages} />
        )}
      </div>

      {/* Skill categories */}
      <div className="border border-[#d0d7de] rounded-lg overflow-hidden bg-white">
        {/* Category tabs */}
        <div className="flex border-b border-[#d0d7de] overflow-x-auto scrollbar-hide">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-white text-[#1f2328] border-b-2 border-[#fd8c73] -mb-px'
                  : 'bg-[#f6f8fa] text-[#656d76] hover:text-[#1f2328] hover:bg-white'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {current.skills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
