import React from 'react';
import ExperienceTimeline from '../components/ExperienceTimeline';
import { experiences } from '../data/experience';

function MetricPill({ icon, label, value, subtext }) {
  return (
    <div className="bg-white border border-[#d0d7de] rounded-xl p-4 flex items-center gap-3.5 shadow-2xs hover:border-[#0969da] hover:shadow-xs transition-all duration-200">
      <div className="w-10 h-10 rounded-lg bg-[#f6f8fa] border border-[#d0d7de] flex items-center justify-center text-[#0969da] flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold text-[#1f2328] font-mono tracking-tight">{value}</span>
          {subtext && <span className="text-[11px] text-[#656d76] font-medium">{subtext}</span>}
        </div>
        <div className="text-xs text-[#57606a] font-medium truncate">{label}</div>
      </div>
    </div>
  );
}

export default function Experience({ onTabChange }) {
  return (
    <div className="animate-slide-up space-y-6">
      {/* Top Banner with Quick Context */}
      <div className="border border-[#d0d7de] rounded-xl bg-gradient-to-r from-[#f6f8fa] via-white to-[#f6f8fa] p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ddf4ff] text-[#0969da] border border-[#54aeff] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#1a7f37] animate-pulse"></span>
              Engineering Track Record
            </div>
            <h1 className="text-2xl font-bold text-[#1f2328] tracking-tight">
              Work Experience & Industry Roles
            </h1>
            <p className="text-sm text-[#57606a] mt-1 max-w-2xl leading-relaxed">
              Professional software engineering experience building scalable web applications, real-time backend systems, and responsive design systems.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {onTabChange && (
              <button
                onClick={() => onTabChange('cv')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] text-[#1f2328] transition-colors shadow-xs cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-[#0969da]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Full CV
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricPill
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          value="1+"
          subtext="yrs"
          label="Industry Exp"
        />
        <MetricPill
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 5m-4 0h4" />
            </svg>
          }
          value="1"
          subtext="org"
          label="Software Labs"
        />
        <MetricPill
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
          value="9+"
          subtext="skills"
          label="Tech Stack"
        />
        <MetricPill
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          value="+25%"
          subtext="gain"
          label="API Latency Saved"
        />
      </div>

      {/* Timeline Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#d0d7de] pb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#0969da]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-sm font-bold text-[#1f2328] uppercase tracking-wider">
              Chronological Career Journey
            </h2>
          </div>
          <span className="text-xs text-[#57606a]">
            {experiences.length} {experiences.length === 1 ? 'position' : 'positions'}
          </span>
        </div>

        <ExperienceTimeline experiences={experiences} />
      </div>

      {/* Open to Work & Opportunity Banner */}
      <div className="border border-[#4ac26b] bg-gradient-to-r from-[#dafbe1]/60 via-[#dafbe1]/30 to-white rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#1a7f37] text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5 sm:mt-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1a7f37] flex items-center gap-2">
              Available for Software Engineering Opportunities
              <span className="inline-block w-2 h-2 rounded-full bg-[#1a7f37] animate-ping" />
            </h3>
            <p className="text-xs sm:text-sm text-[#24292f] mt-1 leading-relaxed">
              Seeking full-stack, frontend, or backend roles specializing in React, Next.js, Node.js, and high-performance web systems. Let's build something remarkable together!
            </p>
          </div>
        </div>

        {onTabChange && (
          <button
            onClick={() => onTabChange('work')}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#1a7f37] hover:bg-[#15662c] text-white transition-all shadow-xs cursor-pointer"
          >
            <span>Let's Connect</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
