import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // URLパラメータのみ抽出
  const q = request.nextUrl.searchParams.get("q");

  if (!q) {
    return Response.json({ message: "Query required" }, { status: 400 });
  }

  const response = await fetch(
    `https://api.github.com/search/repositories?q=${q}`,
    {
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },

      next: {
        revalidate: 60,
      },
    },
  );

  if (!response.ok) {
    return Response.json({ message: "github api error" }, { status: 500 });
  }

  const data = await response.json();

  return Response.json(data);
}
