import React, { useState } from 'react';
import { educationData } from '../data/education';

export default function Education() {
  const [selectedImage, setSelectedImage] = useState(null);
  const edu = educationData[0]; // Primary degree

  return (
    <div className="animate-slide-up space-y-8 pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-xl border border-[#d0d7de] bg-gradient-to-r from-[#0d1117] via-[#161b22] to-[#21262d] p-6 sm:p-8 text-white shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#2ea043]/20 border border-[#2ea043]/40 text-[#56d364] text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#2ea043] animate-pulse"></span>
            Academic & Research Background
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f0f6fc]">
            Education & Scientific Research
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#8b949e] leading-relaxed">
            Academic qualifications, campus life at NSBM Green University, specialized computer science coursework, and active research in real-time systems.
          </p>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#238636]/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Main Degree Card with Campus Visual */}
      <div className="border border-[#d0d7de] rounded-xl overflow-hidden bg-white shadow-sm">
        {/* Campus Hero Image */}
        <div className="relative h-60 sm:h-72 w-full bg-[#0d1117] overflow-hidden group">
          <img
            src={edu.campusImage}
            alt={`${edu.school} Campus`}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2ea043] text-white shadow-xs">
                {edu.status}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-[#e6edf3] border border-white/20">
                {edu.period}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {edu.degree}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-200 mt-1">
              <a
                href={edu.schoolUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#58a6ff] hover:underline flex items-center gap-1"
              >
                {edu.school}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <span>•</span>
              <span>{edu.faculty}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-gray-300">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {edu.location}
              </span>
            </div>
          </div>
        </div>

        {/* Degree Overview Details */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#d0d7de]">
          <p className="text-sm text-[#57606a] leading-relaxed max-w-3xl">
            {edu.description}
          </p>

          {/* Campus photo gallery thumbnails */}
          {edu.campusGallery && (
            <div className="mt-4 pt-4 border-t border-[#d0d7de]/70">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f2328] mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#0969da]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                University Campus Gallery
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {edu.campusGallery.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(item.url)}
                    className="relative aspect-video rounded-lg overflow-hidden border border-[#d0d7de] cursor-pointer group bg-[#0d1117] shadow-2xs"
                  >
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-[10px] text-white font-medium leading-tight truncate">
                        {item.caption}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Featured Research Topic Spotlight */}
      {edu.research && (
        <div className="border border-[#d4a72c] bg-gradient-to-br from-[#fffdf5] via-white to-[#fffcf0] rounded-xl p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f1e0a6] pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-[#fff8c5] text-[#9a6700] border border-[#d4a72c]/50">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#9a6700]">
                  {edu.research.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#1f2328]">
                  Research & Thesis Spotlight
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#fff8c5] text-[#7d4e00] border border-[#d4a72c]">
              <span className="w-2 h-2 rounded-full bg-[#9a6700] animate-pulse"></span>
              {edu.research.status}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-bold text-[#1f2328] leading-snug">
                {edu.research.title}
              </h4>
              <p className="text-xs text-[#656d76] mt-1 font-medium">
                Supervisor: {edu.research.supervisor}
              </p>
            </div>

            <p className="text-sm text-[#57606a] leading-relaxed">
              {edu.research.abstract}
            </p>

            {/* Research Key Contributions */}
            <div className="bg-white rounded-lg p-4 border border-[#e8d49a] space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wide text-[#1f2328]">
                Key Theoretical & Engineering Contributions
              </h5>
              <div className="space-y-1.5">
                {edu.research.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#57606a]">
                    <span className="text-[#9a6700] font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Keywords */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-[#656d76] font-medium mr-1">Index Keywords:</span>
              {edu.research.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-white text-[#9a6700] border border-[#d4a72c]/60 shadow-2xs"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Two Columns: Specialized Modules & Academic Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core & Advanced Modules */}
        <div className="bg-white border border-[#d0d7de] rounded-xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-[#0969da]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-sm font-bold text-[#1f2328] uppercase tracking-wider">
              Key Academic Modules & Coursework
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {edu.courses.map((course, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-[#d0d7de] bg-[#f6f8fa] hover:border-[#0969da] transition-colors"
              >
                <div className="text-xs font-semibold text-[#1f2328]">{course.name}</div>
                <div className="text-[10px] text-[#656d76] mt-0.5">{course.category} Module</div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Milestones */}
        <div className="bg-white border border-[#d0d7de] rounded-xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-[#1a7f37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <h3 className="text-sm font-bold text-[#1f2328] uppercase tracking-wider">
              Academic Milestones & Exhibitions
            </h3>
          </div>
          <div className="space-y-3">
            {edu.academicMilestones.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-lg border border-[#d0d7de] bg-[#fcfdfd]">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-[#1f2328]">{m.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f6f8fa] text-[#57606a] border border-[#d0d7de]">
                    {m.year}
                  </span>
                </div>
                <p className="text-xs text-[#57606a] mt-1 leading-relaxed">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Gallery */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-[#30363d] text-white">
              <span className="text-xs text-[#8b949e]">NSBM Green University Campus Photo</span>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-[#8b949e] hover:text-white p-1 rounded-md"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src={selectedImage}
                alt="Enlarged Campus View"
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
