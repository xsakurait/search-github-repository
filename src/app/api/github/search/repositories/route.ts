import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const q = searchParams.get("q");

  if (!q) {
    return Response.json({ message: "Query required" }, { status: 400 });
  }

  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("per_page") ?? "10";

  const url = new URL("https://api.github.com/search/repositories");

  url.searchParams.set("q", q);
  url.searchParams.set("page", page);
  url.searchParams.set("per_page", perPage);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
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
