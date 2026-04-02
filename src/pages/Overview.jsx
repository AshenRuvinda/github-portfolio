import React, { useState, useEffect } from 'react';
import RepoCard from '../components/RepoCard';
import Skills from '../components/Skills';
import { pinnedProjects } from '../data/projects';
import { fetchContributionCalendar, fetchUserCounts, fetchRecentActivities, fetchTopLanguages, fetchFollowers, fetchOrganizations } from '../utils/githubApi';

// Mini contribution graph generator
function ContributionGraph() {
  const [contributionData, setContributionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchContributionCalendar(selectedYear);
        setContributionData(data);
      } catch (err) {
        setError(err.message);
        // Fallback to fake data if API fails
        setContributionData({
          totalContributions: 387,
          weeks: Array.from({ length: 52 }, (_, w) =>
            ({
              contributionDays: Array.from({ length: 7 }, (_, d) => {
                const isWeekend = d === 0 || d === 6;
                const weekProgress = w / 52;
                const rand = Math.random();

                if (!isWeekend) {
                  const isActivePeriod = (weekProgress > 0.1 && weekProgress < 0.3) ||
                                        (weekProgress > 0.4 && weekProgress < 0.6) ||
                                        (weekProgress > 0.7 && weekProgress < 0.9);

                  if (isActivePeriod) {
                    return { contributionCount: rand < 0.3 ? 0 : rand < 0.6 ? 1 : rand < 0.8 ? 2 : rand < 0.95 ? 3 : 4 };
                  } else {
                    return { contributionCount: rand < 0.4 ? 0 : rand < 0.7 ? 1 : rand < 0.9 ? 2 : 3 };
                  }
                } else {
                  return { contributionCount: rand < 0.8 ? 0 : rand < 0.95 ? 1 : 2 };
                }
              })
            })
          )
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedYear]);

  if (loading) {
    return (
      <div className="border border-[#d0d7de] dark:border-[#30363d] rounded-lg p-5 bg-white dark:bg-[#161b22]">
        <div className="animate-pulse">
          <div className="h-4 bg-[#f6f8fa] dark:bg-[#21262d] rounded mb-4"></div>
          <div className="h-32 bg-[#f6f8fa] dark:bg-[#21262d] rounded"></div>
        </div>
      </div>
    );
  }

  const colors = isDark
    ? ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
    : ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

  const getContributionLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  const cells = contributionData?.weeks?.slice(-52).map(week =>
    week.contributionDays.map(day => getContributionLevel(day.contributionCount))
  ) || [];

  return (
    <div className="border border-[#d0d7de] dark:border-[#30363d] rounded-lg p-5 bg-white dark:bg-[#161b22]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-[#1f2328] dark:text-[#c9d1d9]">
          {contributionData?.totalContributions || 0} contributions in {selectedYear}
        </h3>
        <select 
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="text-xs border border-[#d0d7de] dark:border-[#30363d] rounded-md px-2 py-1 bg-[#f6f8fa] dark:bg-[#21262d] text-[#656d76] dark:text-[#8b949e]"
        >
          <option value={2026}>2026</option>
          <option value={2025}>2025</option>
          <option value={2024}>2024</option>
          <option value={2023}>2023</option>
        </select>
      </div>

      {error && (
        <div className="text-xs text-red-600 dark:text-red-400 mb-4">
          Failed to load contribution data: {error}
        </div>
      )}

      {/* Month labels */}
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="flex gap-[3px] mb-1 pl-8 text-[10px] text-[#656d76] dark:text-[#8b949e]">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
              <div key={m} className="flex-1">{m}</div>
            ))}
          </div>

          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] text-[10px] text-[#656d76] dark:text-[#8b949e] mr-1">
              {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                <div key={i} className="h-[11px] leading-[11px]">{d}</div>
              ))}
            </div>

            {/* Cells */}
            <div className="flex gap-[3px]">
              {cells.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <div
                      key={di}
                      className="contrib-cell rounded-[2px] cursor-pointer hover:ring-1 hover:ring-[#0969da] dark:hover:ring-[#58a6ff] transition-all"
                      style={{ backgroundColor: colors[level] }}
                      title={`${contributionData?.weeks?.[wi]?.contributionDays?.[di]?.contributionCount || level} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1 mt-2 justify-end text-[10px] text-[#656d76] dark:text-[#8b949e]">
            <span>Less</span>
            {colors.map((c) => (
              <div key={c} className="contrib-cell rounded-[2px]" style={{ backgroundColor: c }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadmeCard() {
  const [followers, setFollowers] = useState(0);
  const [loadingFollowers, setLoadingFollowers] = useState(true);
  const [followersError, setFollowersError] = useState('');

  useEffect(() => {
    const loadFollowers = async () => {
      try {
        setLoadingFollowers(true);
        const stats = await fetchUserCounts();
        setFollowers(stats.followers);
      } catch (err) {
        setFollowersError(err.message || 'Could not load followers');
      } finally {
        setLoadingFollowers(false);
      }
    };
    loadFollowers();
  }, []);

  return (
    <div className="border border-[#d0d7de] rounded-lg overflow-hidden bg-white">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#d0d7de] bg-[#f6f8fa]">
        <svg className="w-4 h-4 text-[#656d76]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-sm font-semibold text-[#1f2328]">ashenruvinda</span>
        <span className="text-sm text-[#656d76]">/ README.md</span>
      </div>
      <div className="p-6 prose prose-sm max-w-none">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#1f2328] mb-1">Hi, I'm Ashen Ruvinda</h1>
          <p className="text-[#656d76]">Intern Software Engineer at Furo Labs Pvt Ltd · Open Source Enthusiast</p>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {[
              { label: 'Profile Views', value: '24k', color: 'bg-blue-100 text-blue-800' },
              { label: 'Followers', value: loadingFollowers ? '...' : (followersError ? 'N/A' : followers.toLocaleString()), color: 'bg-green-100 text-green-800' },
              { label: 'Stars', value: '1.7k', color: 'bg-yellow-100 text-yellow-800' },
            ].map((badge) => (
              <span key={badge.label} className={`text-xs px-3 py-1 rounded-full font-medium ${badge.color}`}>
                {badge.label}: {badge.value}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-[#1f2328] mb-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Currently working on
            </h3>
            <p className="text-[#656d76]">
              Furo Labs Pvt. Ltd.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#1f2328] mb-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Currently learning
            </h3>
            <p className="text-[#656d76]">
              React Native,React,SpringBoot & Next JS
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#1f2328] mb-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Ask me about
            </h3>
            <p className="text-[#656d76]">
              Full-stack development using MERN and modern tools.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#1f2328] mb-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Fun fact
            </h3>
            <p className="text-[#656d76]">
              I like creating UI designs that are simple, modern, and responsive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidePanel() {
  const [recentActivities, setRecentActivities] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState('');
  const [topLanguagesData, setTopLanguagesData] = useState([]);
  const [topLanguagesLoading, setTopLanguagesLoading] = useState(true);
  const [topLanguagesError, setTopLanguagesError] = useState('');
  const [followers, setFollowers] = useState([]);
  const [followersLoading, setFollowersLoading] = useState(true);
  const [followersError, setFollowersError] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [orgsLoading, setOrgsLoading] = useState(true);
  const [orgsError, setOrgsError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadActivities = async () => {
      try {
        setActivityLoading(true);
        setActivityError('');
        const events = await fetchRecentActivities(6);
        if (isMounted) setRecentActivities(events);
      } catch (err) {
        if (isMounted) setActivityError(err.message || 'Unable to load activities');
      } finally {
        if (isMounted) setActivityLoading(false);
      }
    };

    const loadLanguages = async () => {
      try {
        setTopLanguagesLoading(true);
        setTopLanguagesError('');
        const languages = await fetchTopLanguages(6);
        if (isMounted && languages.length > 0) setTopLanguagesData(languages);
      } catch (err) {
        if (isMounted) setTopLanguagesError(err.message || 'Unable to load top languages');
      } finally {
        if (isMounted) setTopLanguagesLoading(false);
      }
    };

    loadActivities();
    loadLanguages();

    const loadFollowers = async () => {
      try {
        setFollowersLoading(true);
        setFollowersError('');
        const data = await fetchFollowers(9);
        if (isMounted) setFollowers(data);
      } catch (err) {
        if (isMounted) setFollowersError(err.message || 'Unable to load followers');
      } finally {
        if (isMounted) setFollowersLoading(false);
      }
    };

    const loadOrganizations = async () => {
      try {
        setOrgsLoading(true);
        setOrgsError('');
        const orgs = await fetchOrganizations(9);
        if (isMounted) setOrganizations(orgs);
      } catch (err) {
        if (isMounted) setOrgsError(err.message || 'Unable to load organizations');
      } finally {
        if (isMounted) setOrgsLoading(false);
      }
    };

    loadFollowers();
    loadOrganizations();

    return () => {
      isMounted = false;
    };
  }, []);

  const topLanguages = topLanguagesData.length ? topLanguagesData : (() => {
    const counts = {};
    const colorMap = {};
    pinnedProjects.forEach((repo) => {
      if (!repo.language) return;
      counts[repo.language] = (counts[repo.language] || 0) + 1;
      if (repo.languageColor && !colorMap[repo.language]) {
        colorMap[repo.language] = repo.languageColor;
      }
    });
    const total = Object.values(counts).reduce((sum, v) => sum + v, 0);

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percent: total > 0 ? Math.round((count / total) * 100) : 0,
        color: colorMap[name] || '#8b949e',
      }));
  })();

  return (
    <div className="space-y-5">
      {/* View as */}
      <div className="border border-[#d0d7de] rounded-lg p-4 bg-white text-sm">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-[#656d76]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="font-semibold text-[#1f2328]">View as: </span>
          <span className="text-[#0969da] font-semibold cursor-pointer hover:underline">Public ▾</span>
        </div>
        <p className="text-[#656d76] text-xs leading-relaxed">
          You are viewing the README and pinned repositories as a public user.
        </p>
      </div>

      {/* People / Collaborators */}
      <div className="border border-[#d0d7de] rounded-lg p-4 bg-white">
        <h3 className="text-sm font-semibold text-[#1f2328] mb-3">People</h3>
        <div className="flex flex-wrap gap-2">
          {followersLoading ? (
            <p className="text-xs text-[#656d76]">Loading followers...</p>
          ) : followersError ? (
            <p className="text-xs text-red-600 dark:text-red-400">{followersError}</p>
          ) : followers.length === 0 ? (
            <p className="text-xs text-[#656d76]">No followers found.</p>
          ) : (
            followers.map((user) => (
              <a
                key={user.login}
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#0969da] transition-all"
                title={user.login}
              >
                <img src={user.avatar_url} alt={user.login} className="w-full h-full object-cover" />
              </a>
            ))
          )}
        </div>
      </div>

      {/* Organizations */}
      <div className="border border-[#d0d7de] rounded-lg p-4 bg-white">
        <h3 className="text-sm font-semibold text-[#1f2328] mb-3">Organizations</h3>
        <div className="flex flex-wrap gap-2">
          {orgsLoading ? (
            <p className="text-xs text-[#656d76]">Loading organizations...</p>
          ) : orgsError ? (
            <p className="text-xs text-red-600 dark:text-red-400">{orgsError}</p>
          ) : organizations.length === 0 ? (
            <p className="text-xs text-[#656d76]">No organizations found.</p>
          ) : (
            organizations.map((org) => (
              <a
                key={org.login}
                href={org.html_url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#0969da] transition-all"
                title={org.login}
              >
                <img src={org.avatar_url} alt={org.login} className="w-full h-full object-cover" />
              </a>
            ))
          )}
        </div>
      </div>

      {/* Top languages */}
      <div className="border border-[#d0d7de] rounded-lg p-4 bg-white">
        <h3 className="text-sm font-semibold text-[#1f2328] mb-3">Top languages</h3>
        <div className="space-y-2">
          {topLanguagesLoading ? (
            <p className="text-xs text-[#656d76]">Loading top languages...</p>
          ) : topLanguagesError ? (
            <p className="text-xs text-red-600 dark:text-red-400">{topLanguagesError}</p>
          ) : topLanguages.length === 0 ? (
            <p className="text-xs text-[#656d76]">No languages found.</p>
          ) : (
            topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="lang-dot" style={{ backgroundColor: lang.color }} />
                  <span className="text-[#1f2328]">{lang.name}</span>
                </div>
                <span className="text-[#656d76] text-xs">{lang.percent}%</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Activity */}
      <div className="border border-[#d0d7de] rounded-lg p-4 bg-white">
        <h3 className="text-sm font-semibold text-[#1f2328] mb-3">Recent Activity</h3>
        <div className="space-y-3 text-xs text-[#656d76]">
          {activityLoading ? (
            <div className="text-xs text-[#939ba2]">Loading activity...</div>
          ) : activityError ? (
            <div className="text-xs text-red-600 dark:text-red-400">{activityError}</div>
          ) : recentActivities.length === 0 ? (
            <div className="text-xs text-[#939ba2]">No recent activity found.</div>
          ) : (
            recentActivities.map((a) => (
              <div key={a.id} className="flex items-start gap-2">
                <span className="text-base leading-none flex-shrink-0">•</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1f2328] truncate">{a.text}</p>
                  <p className="text-[10px]">{a.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <div className="animate-slide-up space-y-6">
      {/* README */}
      <ReadmeCard />

      {/* Main + Side grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_296px] gap-6">
        <div className="space-y-6">
          {/* Pinned repos */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-[#1f2328] text-sm">Popular repositories</h2>
              <button className="text-xs text-[#0969da] hover:underline font-medium">Customize your pins</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pinnedProjects.map((project) => (
                <RepoCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Contribution graph */}
          <ContributionGraph />

          {/* Skills section */}
          <div>
            <h2 className="font-semibold text-[#1f2328] text-sm mb-3">Skills & Technologies</h2>
            <Skills />
          </div>
        </div>

        {/* Side panel */}
        <SidePanel />
      </div>
    </div>
  );
}
