import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  if (!owner || !repo) {
    return Response.json({ message: "Owner and repo required" }, { status: 400 });
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      next: {
        revalidate: 60,
      },
    },
  );

  if (!response.ok) {
    return Response.json({ message: "Repository not found" }, { status: 404 });
  }

  const data = await response.json();

  return Response.json(data);
}
