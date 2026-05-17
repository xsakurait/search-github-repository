import RepositoryCard from "./RepositoryCard";

import { Repository } from "../types/repository";

type Props = {
  repositories: Repository[];
};

export default function RepositoryList({ repositories }: Props) {
  if (repositories.length === 0) {
    return <div>repository not found</div>;
  }

  return (
    <div
      className="
      grid
      gap-4
    "
    >
      <RepositoryCard repositories={repositories} />
    </div>
  );
}
