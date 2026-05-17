// 最初に何も表示されない->不自然 特に指定がないため人気順でのリポジトリ表示
export async function fetchDefaultRepositories() {
  const response = await fetch(`/api/github?q=stars:>&sort=stars&order=desc`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("repositories fetch failed");
  }

  return response.json();
}

export async function fetchRepository(keyword: string) {
  const response = await fetch(`/api/github?q=${encodeURIComponent(keyword)}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("repositories fetch failed");
  }

  return response.json();
}

export async function fetchRepositoryDetail(owner: string, repo: string) {
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
