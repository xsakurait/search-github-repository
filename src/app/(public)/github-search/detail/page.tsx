import RepositoryDetail from "@/src/features/github/search/components/RepositoryDetail";
import { fetchRepositoryDetail } from "@/src/features/github/search/api/githubApi";

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

  const detail = await fetchRepositoryDetail(owner, repo);

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
