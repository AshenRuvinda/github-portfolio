import React, { useState } from 'react';
import { profileImage } from '../assets/images/profile';

const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.859L1.073 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function ProfileCard() {
  const [following, setFollowing] = useState(false);

  return (
    <aside className="w-full">
      {/* Avatar */}
      <div className="relative mb-4">
        <div className="w-full aspect-square max-w-[260px] mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-white shadow-md">
          <img
            src={profileImage}
            alt="Ashen Ruvinda"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient with initials if image fails to load
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 flex items-center justify-center hidden">
            <span className="text-white text-7xl font-bold tracking-tighter select-none">AR</span>
          </div>
        </div>
        {/* Online indicator */}
        <div className="absolute bottom-2 right-[calc(50%-130px)] md:right-auto md:left-[200px] w-6 h-6 bg-green-400 rounded-full border-4 border-white shadow-sm"></div>
      </div>

      {/* Name + handle */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#1f2328] leading-tight">Ashen Ruvinda</h1>
        <p className="text-lg text-[#656d76] font-light">ashenruvinda</p>
      </div>

      {/* Bio */}
      <p className="text-sm text-[#1f2328] leading-relaxed mb-4">
        Intern Software Engineer at Furo Labs Pvt Ltd. I work on full-stack development, automation, and product features. Based in Eheliyagoda, Sri Lanka.
      </p>

      {/* Follow button */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setFollowing(!following)}
          className={`flex-1 py-1.5 px-3 text-sm font-semibold rounded-md border transition-all ${
            following
              ? 'bg-white text-[#1f2328] border-[#d0d7de] hover:bg-[#f3f4f6] hover:border-[#afb8c1]'
              : 'bg-[#1f2328] text-white border-[#1f2328] hover:bg-[#31373d]'
          }`}
        >
          {following ? 'Following' : 'Follow'}
        </button>
        <button className="px-3 py-1.5 text-sm font-semibold rounded-md border border-[#d0d7de] bg-[#f6f8fa] hover:bg-[#f3f4f6] hover:border-[#afb8c1] text-[#1f2328] transition-all">
          Sponsor ❤️
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-5 text-sm text-[#656d76]">
        <a href="#" className="hover:text-[#0969da] flex items-center gap-1.5 transition-colors">
          <UsersIcon />
          <span><strong className="text-[#1f2328]">1.4k</strong> followers</span>
        </a>
        <a href="#" className="hover:text-[#0969da] flex items-center gap-1.5 transition-colors">
          <span><strong className="text-[#1f2328]">312</strong> following</span>
        </a>
      </div>

      {/* Meta info */}
      <ul className="space-y-2 text-sm text-[#656d76]">
        <li className="flex items-center gap-2">
          <LocationIcon />
          <span>Remote</span>
        </li>
        <li className="flex items-center gap-2">
          <MailIcon />
          <a href="mailto:ashen.ruvinda@example.com" className="text-[#0969da] hover:underline">
            ashen.ruvinda@example.com
          </a>
        </li>
        <li className="flex items-center gap-2">
          <LinkIcon />
          <a href="#" className="text-[#0969da] hover:underline">
            furo-labs.com
          </a>
        </li>
        <li className="flex items-center gap-2">
          <XIcon />
          <a href="#" className="text-[#0969da] hover:underline">
            @ashenruvinda
          </a>
        </li>
      </ul>

      {/* Divider */}
      <hr className="my-5 border-[#d0d7de]" />

      {/* Achievements / Highlights */}
      <div>
        <h3 className="text-sm font-semibold text-[#1f2328] mb-3">Highlights</h3>
        <div className="space-y-2">
          {[
            { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>, label: 'Active Open Source Contributor' },
            { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>, label: 'Full Stack Developer' },
            { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, label: 'MERN Stack Specialist' },
            { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>, label: 'Passionate Problem Solver' },
          ].map((h) => (
            <div key={h.label} className="flex items-center gap-2 text-sm text-[#656d76]">
              <span className="flex-shrink-0">{h.icon}</span>
              <span>{h.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="my-5 border-[#d0d7de]" />

      {/* Organizations */}
      <div>
        <h3 className="text-sm font-semibold text-[#1f2328] mb-3">Organizations</h3>
        <div className="flex flex-wrap gap-2">
          {['Furo Labs'].map((org) => (
            <div
              key={org}
              title={org}
              className="w-8 h-8 rounded-md bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 cursor-pointer hover:ring-2 hover:ring-[#0969da] transition-all"
            >
              {org[0]}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
