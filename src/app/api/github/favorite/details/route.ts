import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const titlesParam = searchParams.get("titles");

  if (!titlesParam) {
    return NextResponse.json({ items: [] });
  }

  const titles = titlesParam.split(",").filter(Boolean);
  if (titles.length === 0) {
    return NextResponse.json({ items: [] });
  }

  // GitHub Search API を使って repo:xxx をスペースで結合して検索する
  const query = titles.map((title) => `repo:${title}`).join(" ");
  const url = new URL("https://api.github.com/search/repositories");
  url.searchParams.set("q", query);
  url.searchParams.set("per_page", String(Math.min(titles.length, 100)));

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(url.toString(), {
      headers,
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: "GitHub API Error" }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch details" }, { status: 500 });
  }
}
