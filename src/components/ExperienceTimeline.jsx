import React, { useState } from 'react';

export default function ExperienceTimeline({ experiences }) {
  const [expanded, setExpanded] = useState(experiences[0]?.id ?? null);

  return (
    <div className="space-y-0">
      {experiences.map((exp, idx) => {
        const isExpanded = expanded === exp.id;
        const isLast = idx === experiences.length - 1;

        return (
          <div key={exp.id} className="relative flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 border-white shadow-md z-10 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #f6f8fa, #e8eaed)' }}
                onClick={() => setExpanded(isExpanded ? null : exp.id)}
              >
                {exp.logo}
              </div>
              {!isLast && (
                <div className="w-0.5 flex-1 bg-[#d0d7de] mt-1 mb-1 min-h-[24px]" />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 pb-8 ${isLast ? 'pb-0' : ''}`}>
              <div
                className="border border-[#d0d7de] rounded-lg overflow-hidden hover:border-[#b1bac4] transition-all duration-200 bg-white cursor-pointer"
                onClick={() => setExpanded(isExpanded ? null : exp.id)}
              >
                {/* Header */}
                <div className="p-4 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-[#1f2328] text-sm">{exp.role}</h3>
                      <span className="text-xs px-2 py-0.5 bg-[#ddf4ff] text-[#0550ae] rounded-full font-medium">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-sm text-[#0969da] font-medium">{exp.company}</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-[#656d76]">
                      <span>{exp.period}</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-[#656d76] flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="border-t border-[#d0d7de] p-4 animate-fade-in">
                    <p className="text-sm text-[#656d76] leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Key Achievements */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-[#1f2328] uppercase tracking-wide mb-2">
                        Key Achievements
                      </h4>
                      <ul className="space-y-1.5">
                        {exp.achievements.map((a, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#656d76]">
                            <span className="text-[#1a7f37] font-bold mt-0.5">✓</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech stack */}
                    <div>
                      <h4 className="text-xs font-semibold text-[#1f2328] uppercase tracking-wide mb-2">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-0.5 text-xs rounded-full bg-[#f6f8fa] border border-[#d0d7de] text-[#1f2328] font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
