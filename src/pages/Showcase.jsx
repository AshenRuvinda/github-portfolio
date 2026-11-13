import React, { useState } from 'react';
import { showcaseItems } from '../data/showcase';

const statusBadgeStyles = {
  'In Active Development': 'bg-[#fff8c5] text-[#9a6700] border-[#d4a72c]',
  'Beta Testing': 'bg-[#ddf4ff] text-[#0969da] border-[#54aeff]',
  'Shipped': 'bg-[#dafbe1] text-[#1a7f37] border-[#4ac26b]',
  'Concept / Prototype': 'bg-[#fbefff] text-[#8250df] border-[#c297ff]',
};

export default function Showcase({ onSelectProject }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(showcaseItems.map((item) => item.category)))];

  const filteredItems = selectedCategory === 'All'
    ? showcaseItems
    : showcaseItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-[#d0d7de] bg-gradient-to-r from-[#0d1117] via-[#161b22] to-[#21262d] p-6 sm:p-8 text-white shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#388bfd]/20 border border-[#388bfd]/40 text-[#58a6ff] text-xs font-medium mb-3">
            <span className="w-2 h-2 rounded-full bg-[#2ea043] animate-pulse"></span>
            Live Labs & Showcase
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f0f6fc]">
            Ongoing Projects & Feature Showcase
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#8b949e] leading-relaxed">
            Explore live experiments, work-in-progress platforms, and technical architecture previews. Click any card to inspect full details, video walkthroughs, and technical breakdowns.
          </p>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#1f6feb]/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Filter Chips & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d0d7de] pb-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-[#0969da] text-white shadow-sm'
                  : 'bg-[#f6f8fa] text-[#656d76] hover:bg-[#eaeef2] border border-[#d0d7de]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="text-xs text-[#656d76] font-medium flex items-center gap-1.5">
          <svg className="w-4 h-4 text-[#0969da]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Showing {filteredItems.length} {filteredItems.length === 1 ? 'project' : 'projects'}
        </div>
      </div>

      {/* Showcase Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItems.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject && onSelectProject(project.id)}
            className="flex flex-col bg-white border border-[#d0d7de] rounded-xl overflow-hidden hover:border-[#0969da] hover:shadow-xl transition-all duration-300 group cursor-pointer text-left"
          >
            {/* Thumbnail Preview Area (No inline video player on showcase page) */}
            <div className="relative w-full aspect-video bg-[#0d1117] overflow-hidden border-b border-[#d0d7de]">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Status Pill on top-right */}
              <div className="absolute top-3 right-3 z-10">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-sm ${
                    statusBadgeStyles[project.status] || 'bg-gray-100 text-gray-700 border-gray-300'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Video Indicator Pill if project has video */}
              {project.videoUrl && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/75 text-white backdrop-blur-md border border-white/20 shadow-md">
                    <svg className="w-3.5 h-3.5 text-[#f85149]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Video Inside
                  </span>
                </div>
              )}

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white">
                <span className="text-xs font-medium flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-md">
                  View Full Project & Details →
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="mb-2">
                  <h2 className="text-xl font-bold text-[#1f2328] group-hover:text-[#0969da] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs text-[#656d76] font-medium mt-0.5">
                    {project.subtitle}
                  </p>
                </div>

                {/* Progress bar */}
                {project.progress && (
                  <div className="my-3">
                    <div className="flex justify-between items-center text-[11px] text-[#656d76] font-medium mb-1">
                      <span>Development Progress</span>
                      <span className="text-[#1f2328] font-semibold">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-[#eaeef2] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#2ea043] h-full rounded-full transition-all duration-700"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-[#57606a] leading-relaxed mt-2.5 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Highlight badges preview */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-4 bg-[#f6f8fa] border border-[#d0d7de]/70 rounded-lg p-3">
                    <ul className="space-y-1">
                      {project.highlights.slice(0, 2).map((highlight, idx) => (
                        <li key={idx} className="text-xs text-[#57606a] flex items-start gap-2 truncate">
                          <span className="text-[#0969da] font-bold">•</span>
                          <span className="truncate">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#f6f8fa] text-[#0969da] border border-[#d0d7de]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-3 border-t border-[#d0d7de] text-xs">
                  <span className="text-[#656d76]">
                    Updated: <span className="font-medium text-[#1f2328]">{project.lastUpdated}</span>
                  </span>

                  <span className="text-[#0969da] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Details
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
