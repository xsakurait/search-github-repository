import RepositoryDetail from "@/src/features/github/search/components/RepositoryDetail";
import { Repository } from "@/src/features/github/search/types/repository";

type Props = {
  searchParams: Promise<{
    owner?: string;
    repo?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const { owner, repo } = await searchParams;

  if (!owner || !repo) {
    return <div className="p-6">repository not found</div>;
  }

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers,
      next: {
        revalidate: 60,
      },
    },
  );

  if (!response.ok) {
    return <div className="p-6">repository not found</div>;
  }

  const detail: Repository = await response.json();

  return (
    <main
      className="
      max-w-5xl
      mx-auto
      p-6
    "
    >
      <RepositoryDetail repository={detail} />
    </main>
  );
}
