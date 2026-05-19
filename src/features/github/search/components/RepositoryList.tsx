import RepositoryCard from "./RepositoryCard";
import { Repository } from "../types/repository";
import Pagenation from "./Pagenation";
import "@/src/app/globals.css";

type Props = {
  repositories: Repository[];
  page: number;
  setPage: (page: number) => void;
  totalCount: number;
};

export default function RepositoryList({ repositories, page, setPage, totalCount }: Props) {
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
      <Pagenation pages={page} setPage={setPage} repositories={totalCount}/>
    </div>
  )
};
