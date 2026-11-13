import React from 'react';
import { blogPosts } from '../data/blog';

export default function Blog() {
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="border-b border-[#d0d7de] pb-4">
        <h1 className="text-2xl font-semibold text-[#1f2328]">Showcase</h1>
        <p className="text-sm text-[#656d76] mt-1">
          Showcasing my best projects and works.
        </p>
      </div>

      {/* Blog post list */}
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="p-5 border border-[#d0d7de] rounded-lg bg-white hover:border-[#0969da] transition-colors"
          >
            <div className="flex items-center gap-2 text-xs text-[#656d76] mb-2">
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <h2 className="text-lg font-semibold text-[#0969da] hover:underline cursor-pointer">
              {post.link && post.link !== '#' ? (
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              ) : (
                <span>{post.title}</span>
              )}
            </h2>

            <p className="text-sm text-[#656d76] mt-2 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-[#f6f8fa] text-[#0969da] border border-[#d0d7de] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
