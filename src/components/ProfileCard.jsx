import React, { useEffect, useState } from 'react';
import { profileImage } from '../assets/images/profile';
import { fetchUserCounts, checkFollowingStatus, followGitHubUser, unfollowGitHubUser } from '../utils/githubApi';

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

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

export default function ProfileCard() {
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followLoading, setFollowLoading] = useState(false);
  const [followError, setFollowError] = useState('');

  useEffect(() => {
    const loadFollowerData = async () => {
      try {
        const [{ followers: followerCount, following: followingTotal }, isFollowing] = await Promise.all([
          fetchUserCounts(),
          checkFollowingStatus(),
        ]);

        setFollowers(followerCount);
        setFollowingCount(followingTotal);
        setFollowing(isFollowing);
      } catch (error) {
        console.error('Follower data error:', error);
      }
    };

    loadFollowerData();
  }, []);

  const handleFollowClick = async () => {
    setFollowError('');
    setFollowLoading(true);

    try {
      if (following) {
        await unfollowGitHubUser();
        setFollowing(false);
        setFollowers((prev) => Math.max(prev - 1, 0));
      } else {
        await followGitHubUser();
        setFollowing(true);
        setFollowers((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Follow action failed:', error);
      setFollowError('Could not update follow status. Click to open profile.');
      window.open('https://github.com/ashenruvinda', '_blank');
    } finally {
      setFollowLoading(false);
    }
  };

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
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex gap-2">
          <button
            onClick={handleFollowClick}
            disabled={followLoading}
            className={`flex-1 py-1.5 px-3 text-sm font-semibold rounded-md border transition-all ${
              following
                ? 'bg-white text-[#1f2328] border-[#d0d7de] hover:bg-[#f3f4f6] hover:border-[#afb8c1]'
                : 'bg-[#1f2328] text-white border-[#1f2328] hover:bg-[#31373d]'
            } ${followLoading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {following ? 'Following' : 'Follow'}
          </button>
          <button className="px-3 py-1.5 text-sm font-semibold rounded-md border border-[#d0d7de] bg-[#f6f8fa] hover:bg-[#f3f4f6] hover:border-[#afb8c1] text-[#1f2328] transition-all">
            Sponsor
          </button>
        </div>
        {followError && <p className="text-xs text-red-600">{followError}</p>}
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-5 text-sm text-[#656d76]">
        <a href="https://github.com/ashenruvinda?tab=followers" target="_blank" rel="noreferrer" className="hover:text-[#0969da] flex items-center gap-1.5 transition-colors">
          <UsersIcon />
          <span><strong className="text-[#1f2328]">{followers.toLocaleString()}</strong> followers</span>
        </a>
        <a href="https://github.com/ashenruvinda?tab=following" target="_blank" rel="noreferrer" className="hover:text-[#0969da] flex items-center gap-1.5 transition-colors">
          <span><strong className="text-[#1f2328]">{followingCount.toLocaleString()}</strong> following</span>
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
            ashenave@gmail.com
          </a>
        </li>
        <li className="flex items-center gap-2">
          <LinkIcon />
          <a href="https://labs.furo.lk/" className="text-[#0969da] hover:underline">
            labs.furo.lk
          </a>
        </li>
        <li className="flex items-center gap-2">
          <LinkedInIcon />
          <a href="https://www.linkedin.com/in/ashen-ruvinda-929b83345/" className="text-[#0969da] hover:underline">
            Ashen Ruvinda
          </a>
        </li>
        <li className="flex items-center gap-2">
          <WhatsAppIcon />
          <a href="https://wa.me/94761511231" className="text-[#0969da] hover:underline">
            +94 76 151 1231
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
