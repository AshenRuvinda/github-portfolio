import React, { useState } from 'react';

export default function ExperienceTimeline({ experiences }) {
  const [expandedId, setExpandedId] = useState(experiences[0]?.id ?? null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {experiences.map((exp, idx) => {
        const isExpanded = expandedId === exp.id;
        const isLast = idx === experiences.length - 1;

        return (
          <div key={exp.id} className="relative flex gap-4 sm:gap-6 group">
            {/* Timeline track and node */}
            <div className="flex flex-col items-center flex-shrink-0">
              {/* Company Logo / Avatar Node */}
              <div
                onClick={() => toggleExpand(exp.id)}
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md border-2 border-white ring-2 ring-[#d0d7de] cursor-pointer transform group-hover:scale-105 transition-all select-none"
                style={{
                  background: exp.companyColor
                    ? `linear-gradient(135deg, ${exp.companyColor}, #054da7)`
                    : 'linear-gradient(135deg, #1f2328, #30363d)',
                }}
              >
                {exp.companyInitial || exp.logo || '🏢'}
              </div>

              {/* Connecting line */}
              {!isLast && (
                <div className="w-0.5 flex-1 bg-gradient-to-b from-[#d0d7de] to-[#eaeef2] my-2 min-h-[40px]" />
              )}
            </div>

            {/* Main Experience Card */}
            <div className={`flex-1 ${!isLast ? 'pb-4' : ''}`}>
              <div
                className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${
                  isExpanded ? 'border-[#0969da] ring-1 ring-[#0969da]/30' : 'border-[#d0d7de] hover:border-[#b1bac4]'
                }`}
              >
                {/* Clickable Header Bar */}
                <div
                  onClick={() => toggleExpand(exp.id)}
                  className="p-5 sm:p-6 cursor-pointer select-none bg-gradient-to-b from-white to-[#fcfdfd]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        {exp.featuredBadge && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ddf4ff] text-[#0969da] border border-[#54aeff]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0969da] animate-pulse"></span>
                            {exp.featuredBadge}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#f6f8fa] text-[#57606a] border border-[#d0d7de]">
                          {exp.type || 'Full-time'}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#f6f8fa] text-[#57606a] border border-[#d0d7de]">
                          {exp.duration}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#1f2328] group-hover:text-[#0969da] transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="font-semibold text-[#0969da] hover:underline flex items-center gap-1"
                          >
                            {exp.company}
                            <svg className="w-3.5 h-3.5 text-[#57606a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                          <span className="text-[#8c959f]">•</span>
                          <span className="text-[#57606a] flex items-center gap-1 text-xs sm:text-sm">
                            <svg className="w-3.5 h-3.5 text-[#656d76]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Period date & expand toggle */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2 sm:pt-0">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f6f8fa] border border-[#d0d7de] text-xs font-mono text-[#1f2328]">
                        <svg className="w-3.5 h-3.5 text-[#57606a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{exp.period}</span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-[#0969da] font-medium">
                        <span>{isExpanded ? 'Collapse' : 'Details'}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Summary Teaser */}
                  <p className="text-sm text-[#57606a] mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="border-t border-[#d0d7de] bg-[#fcfdfd] p-5 sm:p-6 space-y-6 animate-fadeIn">
                    {/* Key Metric Highlights (if present) */}
                    {exp.achievements && typeof exp.achievements[0] === 'object' && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f2328] mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#1a7f37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          Impact & Quantified Outcomes
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {exp.achievements.map((ach, i) => (
                            <div
                              key={i}
                              className="p-3.5 rounded-lg border border-[#d0d7de] bg-white shadow-xs"
                            >
                              <div className="text-lg font-extrabold text-[#1a7f37] font-mono">
                                {ach.metric}
                              </div>
                              <div className="text-xs font-semibold text-[#1f2328] mt-0.5">
                                {ach.label}
                              </div>
                              <div className="text-[11px] text-[#57606a] mt-1 leading-relaxed">
                                {ach.detail}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Standard Key Achievements fallback if string array */}
                    {exp.achievements && typeof exp.achievements[0] === 'string' && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f2328] mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#1a7f37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Key Achievements & Milestones
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((a, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#57606a]">
                              <span className="text-[#1a7f37] font-bold mt-0.5">✓</span>
                              <span className="leading-relaxed">{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Core Responsibilities */}
                    {exp.responsibilities && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f2328] mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#0969da]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Key Responsibilities & Scope
                        </h4>
                        <div className="space-y-2">
                          {exp.responsibilities.map((resp, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#57606a]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0969da] mt-2 flex-shrink-0" />
                              <span className="leading-relaxed">{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies & Tools */}
                    {exp.tech && exp.tech.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f2328] mb-2.5 flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#8250df]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          Technologies & Frameworks Leveraged
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-medium rounded-full bg-white border border-[#d0d7de] text-[#0969da] shadow-2xs hover:bg-[#f6f8fa] transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
