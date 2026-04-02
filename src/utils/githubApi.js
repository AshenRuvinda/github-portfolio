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