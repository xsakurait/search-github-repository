// 最初に何も表示されない->不自然 特に指定がないため人気順でのリポジトリ表示
// &page=1&per_page=10->pagenation
export async function GET() {
  const url = new URL("https://api.github.com/search/repositories");

  url.searchParams.set("q", "stars:>1");
  url.searchParams.set("sort", "stars");
  url.searchParams.set("order", "desc");
  url.searchParams.set("page", "1");
  url.searchParams.set("per_page", "10");

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url.toString(), {
    headers,
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    return Response.json({ message: "GitHub API Error" }, { status: 500 });
  }

  const data = await response.json();

  return Response.json(data);
}
