import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import RepoCard from '../components/RepoCard';
import Skills from '../components/Skills';
import { pinnedProjects } from '../data/projects';
import promoData from '../data/promo.json';
import { fetchContributionCalendar, fetchUserCounts, fetchRecentActivities, fetchTopLanguages, fetchFollowers, fetchUserAchievements } from '../utils/githubApi';

function PromoLottie() {
  const containerRef = useRef(null);

  useEffect(() => {
    let animInstance = null;
    let isMounted = true;

    if (containerRef.current) {
      animInstance = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/promo.json',
      });
    }

    return () => {
      isMounted = false;
      if (animInstance) {
        animInstance.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center overflow-hidden"
    />
  );
}

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
      <div className="p-4 sm:p-6 prose prose-sm max-w-none">
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1f2328] mb-1">Hi, I'm Ashen Ruvinda</h1>
          <p className="text-sm sm:text-base text-[#656d76]">Intern Software Engineer at Furo Labs Pvt Ltd · Open Source Enthusiast</p>
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
  const [achievements, setAchievements] = useState([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [achievementsError, setAchievementsError] = useState('');
  const [hoveredAchievement, setHoveredAchievement] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

    const loadAchievements = async () => {
      try {
        setAchievementsLoading(true);
        setAchievementsError('');
        const list = await fetchUserAchievements(9);
        if (isMounted) setAchievements(list);
      } catch (err) {
        if (isMounted) setAchievementsError(err.message || 'Unable to load achievements');
      } finally {
        if (isMounted) setAchievementsLoading(false);
      }
    };

    loadFollowers();
    loadAchievements();

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

      {/* Achievements */}
      <div className="border border-[#d0d7de] rounded-lg p-4 bg-white">
        <h3 className="text-sm font-semibold text-[#1f2328] mb-3">Achievements</h3>
        <div className="space-y-2 text-xs text-[#656d76]">
          {achievementsLoading ? (
            <p>Loading achievements...</p>
          ) : achievementsError ? (
            <p className="text-red-600 dark:text-red-400">{achievementsError}</p>
          ) : achievements.length === 0 ? (
            <p>No achievements found.</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="relative cursor-pointer"
                  onMouseEnter={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top });
                    setHoveredAchievement(ach);
                  }}
                  onMouseLeave={() => setHoveredAchievement(null)}
                >
                  {ach.image ? (
                    <img src={ach.image} alt={ach.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#c5ced9] hover:border-[#0969da] transition-all" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#e1e8ed] flex items-center justify-center text-xs text-[#57606a] border-2 border-[#c5ced9]">A</div>
                  )}
                </div>
              ))}
            </div>
          )}
          {hoveredAchievement && (
            <div
              className="fixed z-50 max-w-xs rounded-lg border border-[#d0d7de] bg-white p-4 shadow-xl"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y - 100,
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
              }}
            >
              {hoveredAchievement.image && (
                <div className="mb-3">
                  <img src={hoveredAchievement.image} alt={hoveredAchievement.name} className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-[#c5ced9]" />
                </div>
              )}
              <p className="font-semibold text-base text-[#1f2328] text-center mb-2">{hoveredAchievement.name}</p>
              <p className="text-sm text-[#57606a] text-center">{hoveredAchievement.description || 'Achievement earned!'}</p>
            </div>
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

export default function Overview({ onTabChange }) {
  const WHATSAPP_NUMBER = '94761511231';

  return (
    <div className="animate-slide-up space-y-6">
      {/* Top Section: README + 3:4 Promotional Box */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-6 items-stretch">
        {/* Left: README.md Card */}
        <div className="min-w-0">
          <ReadmeCard />
        </div>

        {/* Right: 3:4 Promotional Offer Box (Matches GitHub White / Light Card Theme) */}
        {promoData?.active && (
          <div className="w-full flex">
            <div className="w-full aspect-[3/4] min-h-[360px] rounded-lg border border-[#d0d7de] bg-white overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#b1bac4] transition-all">
              {/* GitHub Card Header Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#d0d7de] bg-[#f6f8fa]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1f2328]">
                  <svg className="w-4 h-4 text-[#0969da]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  <span>{promoData.badge}</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#dafbe1] text-[#1a7f37] border border-[#2da44e]/30">
                  {promoData.status}
                </span>
              </div>

              {/* Card Content Body with Lottie Animation */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 text-[11px] font-medium rounded-full bg-[#ddf4ff] text-[#0969da]">
                      {promoData.tag}
                    </span>
                    <span className="text-[10px] text-[#57606a] font-medium">
                      Web Development
                    </span>
                  </div>

                  {/* Lottie Animation Display Area without boxed canvas */}
                  <div className="w-full h-36 mb-2 overflow-hidden flex items-center justify-center">
                    <PromoLottie />
                  </div>

                  <h3 className="text-sm font-bold text-[#1f2328] leading-tight">
                    {promoData.title}
                  </h3>
                  <p className="text-xs text-[#57606a] mt-1 leading-snug">
                    {promoData.subtitle}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-[#d0d7de] space-y-2">
                  <button
                    onClick={() => {
                      const text = promoData.whatsappMessage;
                      window.open(`https://wa.me/${promoData.whatsappNumber || WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-md font-semibold text-xs bg-[#2da44e] text-white hover:bg-[#2c974b] transition-colors shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>{promoData.ctaText}</span>
                  </button>

                  {onTabChange && (
                    <button
                      onClick={() => onTabChange('packages')}
                      className="w-full py-1.5 px-3 rounded-md font-medium text-xs border border-[#d0d7de] bg-[#f6f8fa] hover:bg-[#ebeef2] text-[#1f2328] transition-colors flex items-center justify-center gap-1"
                    >
                      <span>{promoData.exploreText}</span>
                      <svg className="w-3.5 h-3.5 text-[#57606a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
