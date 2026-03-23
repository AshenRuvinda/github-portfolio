import React from 'react';

const StarIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const ForkIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export default function RepoCard({ project }) {
  const { name, description, language, languageColor, stars, forks, visibility, topics, updatedAt, url } = project;

  return (
    <div className="border border-[#d0d7de] rounded-lg p-5 hover:shadow-md hover:border-[#b1bac4] transition-all duration-200 bg-white group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0969da] font-semibold text-sm group-hover:underline truncate"
        >
          {name}
        </a>
        <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full border border-[#d0d7de] text-[#656d76] font-medium">
          {visibility}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-[#656d76] leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>
      )}

      {/* Topics */}
      {topics && topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {topics.map((topic) => (
            <span
              key={topic}
              className="px-2.5 py-0.5 text-xs rounded-full bg-[#ddf4ff] text-[#0550ae] hover:bg-[#c8e7ff] cursor-pointer transition-colors font-medium"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-4 text-xs text-[#656d76]">
        {language && (
          <span className="flex items-center gap-1.5">
            <span
              className="lang-dot"
              style={{ backgroundColor: languageColor }}
            />
            {language}
          </span>
        )}

        {stars > 0 && (
          <a href="#" className="flex items-center gap-1 hover:text-[#0969da] transition-colors" onClick={(e) => e.preventDefault()}>
            <StarIcon />
            {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
          </a>
        )}

        {forks > 0 && (
          <a href="#" className="flex items-center gap-1 hover:text-[#0969da] transition-colors" onClick={(e) => e.preventDefault()}>
            <ForkIcon />
            {forks}
          </a>
        )}

        {updatedAt && (
          <span className="ml-auto">Updated {updatedAt}</span>
        )}
      </div>
    </div>
  );
}
