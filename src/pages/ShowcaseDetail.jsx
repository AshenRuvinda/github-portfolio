import React, { useState } from 'react';
import { showcaseItems } from '../data/showcase';

const statusBadgeStyles = {
  'In Active Development': 'bg-[#fff8c5] text-[#9a6700] border-[#d4a72c]',
  'Beta Testing': 'bg-[#ddf4ff] text-[#0969da] border-[#54aeff]',
  'Shipped': 'bg-[#dafbe1] text-[#1a7f37] border-[#4ac26b]',
  'Concept / Prototype': 'bg-[#fbefff] text-[#8250df] border-[#c297ff]',
};

export default function ShowcaseDetail({ projectId, onBack }) {
  const project = showcaseItems.find((item) => item.id === Number(projectId)) || showcaseItems[0];
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);

  if (!project) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-[#656d76]">Project not found.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#0969da] text-white rounded-md text-sm font-medium"
        >
          ← Back to Showcase
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Back button & top navigation breadcrumb */}
      <div className="flex items-center justify-between gap-4 border-b border-[#d0d7de] pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] text-[#1f2328] transition-colors shadow-sm"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Showcase
        </button>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              statusBadgeStyles[project.status] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {project.status}
          </span>
          <span className="text-xs text-[#656d76] hidden sm:inline">
            Updated {project.lastUpdated}
          </span>
        </div>
      </div>

      {/* Project Header */}
      <div>
        <div className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-[#f6f8fa] text-[#0969da] border border-[#d0d7de] mb-2">
          {project.category}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1f2328] tracking-tight">
          {project.title}
        </h1>
        <p className="text-sm sm:text-base text-[#57606a] mt-1.5 leading-relaxed">
          {project.subtitle}
        </p>
      </div>

      {/* Primary Media Section: Video Player or Hero Visual */}
      {project.videoUrl ? (
        <div className="rounded-xl overflow-hidden border border-[#d0d7de] bg-[#0d1117] shadow-lg">
          <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center justify-between text-xs text-[#8b949e]">
            <span className="flex items-center gap-1.5 font-medium text-white">
              <span className="w-2 h-2 rounded-full bg-[#f85149] animate-pulse"></span>
              Video Demonstration / Walkthrough
            </span>
            <span>MP4 Preview</span>
          </div>
          <div className="relative aspect-video w-full">
            <video
              src={project.videoUrl}
              poster={project.thumbnail}
              controls
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-[#d0d7de] shadow-sm max-h-[460px] bg-[#0d1117]">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Progress & Quick Links bar */}
      <div className="bg-[#f6f8fa] border border-[#d0d7de] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {project.progress && (
          <div className="flex-1 max-w-sm">
            <div className="flex justify-between items-center text-xs font-medium text-[#656d76] mb-1.5">
              <span>Overall Completion</span>
              <span className="text-[#1f2328] font-bold">{project.progress}%</span>
            </div>
            <div className="w-full bg-[#e1e4e8] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#2ea043] h-full rounded-full transition-all duration-700"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] text-[#1f2328] transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
              </svg>
              View Repository
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#2ea043] hover:bg-[#2c974b] text-white transition-colors shadow-sm"
            >
              Launch Live Prototype
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Main Breakdown: Overview & Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Deep dive */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#d0d7de] rounded-xl p-5 sm:p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#1f2328] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#0969da]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Project Overview & Objectives
            </h2>
            <p className="text-sm text-[#57606a] leading-relaxed">
              {project.overview || project.description}
            </p>
          </div>

          {/* Architecture & Engineering Highlights */}
          {project.architecture && (
            <div className="bg-white border border-[#d0d7de] rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-base font-bold text-[#1f2328] mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#8250df]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Core Architecture & Components
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {project.architecture.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-[#f6f8fa] border border-[#d0d7de]/70 rounded-lg">
                    <h3 className="text-sm font-semibold text-[#1f2328]">{item.title}</h3>
                    <p className="text-xs text-[#57606a] mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Screenshots Gallery if available */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="bg-white border border-[#d0d7de] rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-base font-bold text-[#1f2328] mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#0969da]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Visual Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedGalleryImg(imgUrl)}
                    className="relative aspect-video rounded-lg overflow-hidden border border-[#d0d7de] cursor-pointer group bg-[#0d1117]"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                      Click to expand
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Tech Spec & Key Milestones */}
        <div className="space-y-6">
          {/* Direct Download Card if project offers desktop software */}
          {project.downloadUrl && (
            <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] border border-[#30363d] rounded-xl p-5 text-white shadow-md">
              <div className="flex items-center gap-2 mb-2 text-[#58a6ff]">
                <svg className="w-5 h-5 text-[#3fb950]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  Desktop Companion App
                </h2>
              </div>
              <p className="text-xs text-[#8b949e] mb-4 leading-relaxed">
                Install the local UDP telemetry companion to stream EA SPORTS F1 25 packets straight to the cloud.
              </p>
              <a
                href={project.downloadUrl}
                download
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white transition-all shadow-sm group"
              >
                <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{project.downloadLabel || 'Download Software'}</span>
              </a>
              {project.downloadInfo && (
                <div className="text-[11px] text-[#8b949e] text-center mt-2 font-mono">
                  {project.downloadInfo}
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          <div className="bg-white border border-[#d0d7de] rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-[#1f2328] mb-3 uppercase tracking-wider">
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#f6f8fa] text-[#0969da] border border-[#d0d7de]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key Milestones */}
          {project.highlights && (
            <div className="bg-white border border-[#d0d7de] rounded-xl p-5 shadow-sm">
              <h2 className="text-sm font-bold text-[#1f2328] mb-3 uppercase tracking-wider">
                Key Deliverables
              </h2>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-xs text-[#57606a] flex items-start gap-2">
                    <span className="text-[#2ea043] font-bold mt-0.5">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedGalleryImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedGalleryImg(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-[#30363d] text-white">
              <span className="text-xs text-[#8b949e]">Image Preview</span>
              <button
                onClick={() => setSelectedGalleryImg(null)}
                className="text-[#8b949e] hover:text-white p-1 rounded-md"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src={selectedGalleryImg}
                alt="Enlarged preview"
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

