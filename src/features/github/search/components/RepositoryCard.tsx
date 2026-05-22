"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";

import "@/src/app/globals.css";

import FavoriteButton from "./favoriteButton";

import { Repository } from "../types/repository";
import { getLanguageIconSrc } from "../utils/languageIcon";
import { useFavoriteStore } from "../../favorite/store/favoriteStore";

type FavoriteItem = {
  id: number;
  itemId: number;
  itemTitle: string;
};

type Props = {
  repositories: Repository[];
};

export default function RepositoryCard({ repositories }: Props) {
  const favoriteItems = useFavoriteStore((state) => state.favoriteItems);
  return (
    <Card className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {repositories.map((repository: Repository) => {
        const repositoryIsFavorite = favoriteItems.some(
          (item) => item.itemId === repository.id,
        );

        return (
          <div key={repository.id} className="w-full">
            <Link
              href={`/github-search/detail?owner=${repository.owner.login}&repo=${repository.name}`}
              className="block border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-200"
            >
              <CardHeader className="flex items-center gap-4 mb-5">
                <img
                  src={repository.owner.avatar_url}
                  alt={repository.owner.login}
                  className="w-14 h-14 rounded-full border border-gray-100 flex-shrink-0 object-cover"
                />

                <CardTitle className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold text-gray-900 truncate">
                    {repository.full_name}
                  </h2>

                  <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                    <Image
                      src={getLanguageIconSrc(repository.language)}
                      alt={repository.language ?? "Unknown"}
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />

                    {repository.language ?? "Unknown"}
                  </p>
                </CardTitle>
              </CardHeader>

              <CardDescription className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100 text-center">
                <CardContent>
                  Star数
                  <br />
                  {repository.stargazers_count.toLocaleString()}
                </CardContent>

                <CardContent>
                  Watcher数
                  <br />
                  {repository.watchers_count.toLocaleString()}
                </CardContent>

                <CardContent>
                  Fork数
                  <br />
                  {repository.forks_count.toLocaleString()}
                </CardContent>

                <CardContent>
                  Issue数
                  <br />
                  {repository.open_issues_count.toLocaleString()}
                </CardContent>

                <CardContent>
                  <FavoriteButton repository={repository} />
                </CardContent>
              </CardDescription>
            </Link>
          </div>
        );
      })}
    </Card>
  );
}
