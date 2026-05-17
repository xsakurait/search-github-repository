// 最初に何も表示されない->不自然 特に指定がないため人気順でのリポジトリ表示
// &page=1&per_page=10->pagenation

export async function fetchDefaultRepositories(page: number) {
  const response = await fetch(
    `/api/github?q=stars:>&sort=stars&order=desc&page=${page}&per_page=10`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("repositories fetch failed");
  }

  return response.json();
}

export async function fetchRepository(keyword: string, page: number) {
  const response = await fetch(
    `/api/github?q=${encodeURIComponent(keyword)}&page=${page}&per_page=10`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    },
  );

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
