import React from 'react';
import ExperienceTimeline from '../components/ExperienceTimeline';
import { experiences } from '../data/experience';

function StatCard({ icon, label, value }) {
  return (
    <div className="border border-[#d0d7de] rounded-lg p-4 bg-white text-center hover:shadow-md transition-all">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-bold text-[#1f2328]">{value}</div>
      <div className="text-xs text-[#656d76] mt-0.5">{label}</div>
    </div>
  );
}

export default function Experience() {
  const totalYears = '1+';
  const companies = '1';
  const technologies = '6+';
  const products = '0';

  return (
    <div className="animate-slide-up space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} label="Companies" value={companies} />
        <StatCard icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} label="Years Experience" value={totalYears} />
        <StatCard icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>} label="Technologies Used" value={technologies} />
        <StatCard icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} label="Products Shipped" value={products} />
      </div>

      {/* Timeline header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#1f2328]">Work History</h2>
        <a
          href="#"
          className="text-xs text-[#0969da] hover:underline font-medium flex items-center gap-1"
          onClick={(e) => e.preventDefault()}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Resume
        </a>
      </div>

      {/* Timeline */}
      <ExperienceTimeline experiences={experiences} />

      {/* Open to work banner */}
      <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-start gap-3">
        <span className="text-green-500 mt-0.5">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold text-green-800">Open to opportunities</p>
          <p className="text-xs text-green-700 mt-0.5">
           Interested in full-time roles in software development, especially in MERN stack and open source projects. Feel free to reach out!
          </p>
        </div>
      </div>
    </div>
  );
}
