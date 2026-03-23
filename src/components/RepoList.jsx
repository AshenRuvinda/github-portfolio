import React, { useState } from 'react';
import RepoCard from './RepoCard';
import { projects } from '../data/projects';

const SearchIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const LANGUAGES = ['All', 'TypeScript', 'JavaScript', 'Go', 'Python', 'Rust', 'Vue'];
const TYPES = ['All', 'Public', 'Private', 'Forks', 'Archived'];
const SORTS = ['Last updated', 'Name', 'Stars'];

export default function RepoList() {
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Last updated');

  const filtered = projects
    .filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(search.toLowerCase());
      const matchLang = langFilter === 'All' || p.language === langFilter;
      return matchSearch && matchLang;
    })
    .sort((a, b) => {
      if (sortBy === 'Name') return a.name.localeCompare(b.name);
      if (sortBy === 'Stars') return b.stars - a.stars;
      return 0; // default: last updated order
    });

  return (
    <div className="animate-slide-up">
      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find a repository..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#d0d7de] rounded-md bg-[#f6f8fa] focus:bg-white focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] transition-all"
          />
        </div>

        {/* Language filter */}
        <div className="flex gap-2">
          <select
            value={langFilter}
            onChange={(e) => setLangFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-[#d0d7de] rounded-md bg-[#f6f8fa] focus:outline-none focus:border-[#0969da] text-[#1f2328] cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-sm border border-[#d0d7de] rounded-md bg-[#f6f8fa] focus:outline-none focus:border-[#0969da] text-[#1f2328] cursor-pointer"
          >
            {SORTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <button className="px-4 py-2 text-sm font-semibold bg-[#1f883d] text-white rounded-md hover:bg-[#1a7f37] transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New
          </button>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-[#656d76] mb-4">
        {filtered.length} {filtered.length === 1 ? 'repository' : 'repositories'}
        {search && ` matching "${search}"`}
      </p>

      {/* Cards grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((project) => (
            <RepoCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-[#656d76]">
          <svg className="w-12 h-12 mx-auto mb-3 text-[#d0d7de]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <p className="font-medium text-[#1f2328]">No repositories found</p>
          <p className="text-sm mt-1">Try a different search or filter</p>
        </div>
      )}
    </div>
  );
}
