import Link from "next/link";

import { Repository } from "../types/repository";

type Props = {
  repositories: Repository[];
};

export default function RepositoryCard({ repositories }: Props) {
  return (
    <>
      {repositories.map((repository: Repository) => (
        <main key={repository.id}>
          <Link
            href={`/github-search/detail?owner=${repository.owner.login}&repo=${repository.name}`}
            className="
              block
              border
              rounded-xl
              p-4
              hover:bg-gray-50
            "
          >
            <div
              className="
              flex
              gap-4
            "
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
                className="
                  w-14
                  h-14
                  rounded-full
                "
              />

              <div>
                <h2
                  className="
                  font-bold
                "
                >
                  {repository.full_name}
                </h2>

                <p
                  className="
                  text-sm
                  text-gray-500
                "
                >
                  {repository.language}
                </p>
              </div>
            </div>
          </Link>
        </main>
      ))}
    </>
  );
}
