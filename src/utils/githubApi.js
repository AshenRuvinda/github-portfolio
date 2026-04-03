// GitHub API utility for fetching contribution data
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'ashenruvinda';

export async function fetchContributionCalendar(year = null) {
  if (!GITHUB_TOKEN) {
    throw new Error('Missing GitHub token: set VITE_GITHUB_TOKEN in .env');
  }

  // Calculate date range for the specified year
  const currentYear = new Date().getFullYear();
  const targetYear = year || currentYear;
  
  const fromDate = `${targetYear}-01-01T00:00:00Z`;
  const toDate = `${targetYear}-12-31T23:59:59Z`;

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : undefined,
    },
    body: JSON.stringify({
      query,
      variables: { 
        username: GITHUB_USERNAME,
        from: fromDate,
        to: toDate
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data.user.contributionsCollection.contributionCalendar;
}

export async function fetchUserCounts() {
  if (!GITHUB_TOKEN) {
    throw new Error('Missing GitHub token: set VITE_GITHUB_TOKEN in .env');
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        followers {
          totalCount
        }
        following {
          totalCount
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return {
    followers: json.data.user.followers.totalCount,
    following: json.data.user.following.totalCount,
  };
}

export async function checkFollowingStatus() {
  if (!GITHUB_TOKEN) {
    return false;
  }

  const response = await fetch(`https://api.github.com/user/following/${GITHUB_USERNAME}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  });

  return response.status === 204;
}

export async function fetchTopLanguages(limit = 7) {
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=pushed`;
  const response = await fetch(url, {
    headers: {
      Authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : undefined,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API repo language error: ${response.status}`);
  }

  const repos = await response.json();

  const counts = {};
  repos.forEach((repo) => {
    if (!repo.language) return;
    counts[repo.language] = (counts[repo.language] || 0) + 1;
  });

  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  if (total === 0) {
    return [];
  }

  const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572a5',
    Java: '#b07219',
    Go: '#00add8',
    Ruby: '#701516',
    PHP: '#4f5d95',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Rust: '#dea584',
    Dart: '#00B4AB',
    CSS: '#563d7c',
    HTML: '#e34c26',
    'Tailwind CSS': '#38bdf8',
  };

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, value]) => ({
      name,
      percent: Math.round((value / total) * 100),
      color: languageColors[name] || '#8b949e',
    }));
}

export async function fetchFollowers(limit = 9) {
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/followers?per_page=${limit}`;
  const response = await fetch(url, {
    headers: {
      Authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : undefined,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API followers error: ${response.status}`);
  }

  const followers = await response.json();

  return followers.map((user) => ({
    login: user.login,
    avatar_url: user.avatar_url,
    html_url: user.html_url,
  }));
}

export async function fetchUserAchievements(limit = 9) {
  const baseUrl = `https://github.com/users/${GITHUB_USERNAME}/achievements`;
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl)}`;

  try {
    const response = await fetch(proxyUrl, {
      headers: { Accept: 'text/html' },
    });

    if (response.ok) {
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const cards = Array.from(doc.querySelectorAll('.js-achievement-card-details'));
      const achievements = cards
        .map((card) => {
          const slug = card.getAttribute('data-achievement-slug') || '';
          const img = card.querySelector('img.achievement-badge-card');
          const nameEl = card.querySelector('h3');
          const linkEl = card.querySelector('a[href*="/achievements/"]');

          const image = img?.getAttribute('src') || img?.getAttribute('data-src') || '';
          const name = (nameEl?.textContent || img?.getAttribute('alt') || 'Achievement').trim();
          const url = linkEl ? `https://github.com${linkEl.getAttribute('href')}` : baseUrl;

          if (!image || !name) return null;

          return {
            id: slug || name,
            name,
            description: name,
            image: image.startsWith('http') ? image : `https://github.githubassets.com${image}`,
            url,
          };
        })
        .filter(Boolean);

      if (achievements.length > 0) {
        const unique = Array.from(new Map(achievements.map((a) => [a.id, a])).values());
        return unique.slice(0, limit);
      }
    }
  } catch (e) {
    console.warn('Achievement fetch fallback:', e);
  }

  // Final fallback as stats if HTML scrape fails
  if (!GITHUB_TOKEN) {
    return [];
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        followers { totalCount }
        repositories(privacy: PUBLIC) { totalCount }
        starredRepositories { totalCount }
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalRepositoryContributions
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API achievements error: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  const user = data.data?.user;
  if (!user) {
    return [];
  }

  const contribCollection = user.contributionsCollection || {};
  const totalContributions =
    (contribCollection.totalCommitContributions || 0) +
    (contribCollection.totalPullRequestContributions || 0) +
    (contribCollection.totalIssueContributions || 0) +
    (contribCollection.totalRepositoryContributions || 0);

  const result = [
    {
      id: 'contributions',
      name: `Contributions: ${totalContributions}`,
      description: `Commits/PRs/issues/repo contributions in last year.`,
    },
    {
      id: 'public-repos',
      name: `Public repositories: ${user.repositories?.totalCount || 0}`,
      description: `Public repos owned by the user.`,
    },
    {
      id: 'followers',
      name: `Followers: ${user.followers?.totalCount || 0}`,
      description: `GitHub followers count.`,
    },
    {
      id: 'starred',
      name: `Starred repos: ${user.starredRepositories?.totalCount || 0}`,
      description: `Repositories starred by this user.`,
    },
  ];

  return result.slice(0, limit);
}


export async function fetchRecentActivities(limit = 5) {
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=${limit}`;
  const response = await fetch(url, {
    headers: {
      Authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : undefined,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API events error: ${response.status}`);
  }

  const events = await response.json();

  return events.map((event) => {
    const repoName = event.repo?.name || 'unknown';
    const at = new Date(event.created_at).toLocaleString();
    let text = '';

    switch (event.type) {
      case 'PushEvent': {
        const commitCount = event.payload?.commits?.length || 0;
        text = `Pushed ${commitCount} commit${commitCount === 1 ? '' : 's'} to ${repoName}`;
        break;
      }
      case 'PullRequestEvent': {
        const action = event.payload?.action || 'updated';
        const title = event.payload?.pull_request?.title || '';
        text = `${action} pull request '${title}' in ${repoName}`;
        break;
      }
      case 'IssuesEvent': {
        const action = event.payload?.action || 'updated';
        const title = event.payload?.issue?.title || '';
        text = `${action} issue '${title}' in ${repoName}`;
        break;
      }
      case 'IssueCommentEvent': {
        const action = event.payload?.action || 'commented';
        const title = event.payload?.issue?.title || '';
        text = `${action} on issue '${title}' in ${repoName}`;
        break;
      }
      case 'CreateEvent':
        text = `Created ${event.payload?.ref_type || 'resource'} in ${repoName}`;
        break;
      case 'WatchEvent':
        text = `Starred ${repoName}`;
        break;
      case 'ForkEvent':
        text = `Forked ${repoName}`;
        break;
      default:
        text = `${event.type} on ${repoName}`;
    }

    return {
      id: event.id,
      type: event.type,
      repo: repoName,
      text,
      time: at,
    };
  });
}

export async function followGitHubUser() {
  if (!GITHUB_TOKEN) {
    throw new Error('Missing GitHub token: set VITE_GITHUB_TOKEN in .env');
  }

  const response = await fetch(`https://api.github.com/user/following/${GITHUB_USERNAME}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (response.status !== 204) {
    throw new Error(`GitHub follow failed: ${response.status}`);
  }

  return true;
}

export async function unfollowGitHubUser() {
  if (!GITHUB_TOKEN) {
    throw new Error('Missing GitHub token: set VITE_GITHUB_TOKEN in .env');
  }

  const response = await fetch(`https://api.github.com/user/following/${GITHUB_USERNAME}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (response.status !== 204) {
    throw new Error(`GitHub unfollow failed: ${response.status}`);
  }

  return true;
}