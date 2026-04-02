// GitHub API utility for fetching contribution data
const GITHUB_TOKEN = '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'; // Add your GitHub personal access token here
const GITHUB_USERNAME = 'ashenruvinda'; // Your GitHub username

export async function fetchContributionCalendar(year = null) {
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