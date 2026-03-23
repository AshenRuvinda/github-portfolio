import React, { useState } from 'react';
import { educationData } from '../data/education';

function EducationCard({ edu }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-[#d0d7de] rounded-lg overflow-hidden bg-white hover:border-[#b1bac4] hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div
        className="p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-[#1f2328] text-sm leading-snug">{edu.degree}</h3>
                <p className="text-sm text-[#0969da] font-medium mt-0.5">{edu.school}</p>
              </div>
              <svg
                className={`w-4 h-4 text-[#656d76] flex-shrink-0 transition-transform mt-0.5 ${expanded ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#656d76]">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {edu.period}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {edu.location}
              </span>
              {edu.gpa && (
                <span className="px-2 py-0.5 bg-[#ddf4ff] text-[#0550ae] rounded-full font-medium text-[10px]">
                  GPA: {edu.gpa}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-[#d0d7de] p-5 animate-fade-in">
          <p className="text-sm text-[#656d76] leading-relaxed mb-4">{edu.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Courses */}
            {edu.courses && edu.courses.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-[#1f2328] uppercase tracking-wide mb-2">
                  Key Courses
                </h4>
                <ul className="space-y-1">
                  {edu.courses.map((c, i) => (
                    <li key={i} className="text-xs text-[#656d76] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#d0d7de] flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Awards */}
            {edu.awards && edu.awards.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-[#1f2328] uppercase tracking-wide mb-2">
                  Awards & Honors
                </h4>
                <ul className="space-y-1">
                  {edu.awards.map((a, i) => (
                    <li key={i} className="text-xs text-[#656d76] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#d0d7de] flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Education() {
  return (
    <div className="animate-slide-up space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[#1f2328]">Education & Certifications</h2>
          <p className="text-xs text-[#656d76] mt-0.5">
            Academic background and professional certifications
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 bg-[#f6f8fa] border border-[#d0d7de] rounded-full text-[#656d76] font-medium">
          {educationData.length} entries
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {educationData.map((edu) => (
          <EducationCard key={edu.id} edu={edu} />
        ))}
      </div>

      {/* Continuous learning banner */}
      <div className="border border-[#d0d7de] rounded-lg p-5 bg-[#f6f8fa]">
        <h3 className="text-sm font-semibold text-[#1f2328] mb-3 flex items-center gap-2">
          Continuous Learning
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Zig Programming Language',
            'WebAssembly Runtimes',
            'Formal Methods & TLA+',
            'Advanced Consensus Algorithms',
            'Differential Privacy',
          ].map((topic) => (
            <span
              key={topic}
              className="px-3 py-1.5 text-xs rounded-full border border-[#d0d7de] bg-white text-[#1f2328] hover:border-[#0969da] hover:text-[#0969da] cursor-pointer transition-all"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
