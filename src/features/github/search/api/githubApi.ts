export async function fetchRepositories(keyword: string) {
  const response = await fetch(`/api/github/search?q=${encodeURIComponent(keyword)}`);

  if (!response.ok) {
    throw new Error("repositories fetch failed");
  }

  return response.json();
}

export async function fetchRepository(owner: string, repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("repository fetch failed");
  }

  return response.json();
}
