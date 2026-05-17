import Link from "next/link";

import { Repository } from "../types/repository";

type Props = {
  repositories: Repository[];
};

export default function RepositoryCard({ repositories }: Props) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {repositories.map((repository: Repository) => (
        <div key={repository.id} className="w-full">
          <Link
            href={`/github-search/detail?owner=${repository.owner.login}&repo=${repository.name}`}
            className="block border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-200"
          >
            {/* 上部: Owner アバターアイコン + リポジトリ名/言語 */}
            <div className="flex items-center gap-4 mb-5">
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
                className="w-14 h-14 rounded-full border border-gray-100 flex-shrink-0 object-cover"
              />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-gray-900 truncate">
                  {repository.full_name}
                </h2>

                <p className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mt-1.5">
                  {repository.language || "Unknown"}
                </p>
              </div>
            </div>

            {/* 下部: 設計スケッチ通りの 4列カウンター (Star数, Watcher数, Fork数, Issue数) */}
            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100 text-center">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Star数
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {repository.stargazers_count.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Watcher数
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {repository.watchers_count.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Fork数
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {repository.forks_count.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Issue数
                </p>
                <p className="text-lg font-bold text-red-600">
                  {repository.open_issues_count.toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
