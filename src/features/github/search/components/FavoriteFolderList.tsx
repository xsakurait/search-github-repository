"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import { FavoriteWithItems } from "../hooks/useSearchRepository";
import { SearchRepositoriesResponse } from "../types/repository";
import RepositoryCard from "./RepositoryCard";

type Props = {
  favorites: FavoriteWithItems[] | undefined;
  onBack: () => void;
};

const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed");
  }
  return response.json() as Promise<T>;
};

export default function FavoriteFolderList({ favorites, onBack }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const allTitles = favorites
    ? Array.from(
        new Set(favorites.flatMap((fav) => fav.items.map((item) => item.itemTitle)))
      )
    : [];

  const titlesParam = allTitles.join(",");

  // お気に入り詳細情報を取得
  const { data, error, isLoading } = useSWR<SearchRepositoriesResponse>(
    session?.user && titlesParam
      ? `/api/github/favorite/details?titles=${encodeURIComponent(titlesParam)}`
      : null,
    fetcher
  );

  if (!session?.user) {
    return (
      <div>
        <h2 className="mb-4 text-2xl font-bold">お気に入り一覧</h2>
        <p className="mb-4 text-gray-600">
          お気に入りはログインユーザーごとに管理されています。
        </p>
        <button
          type="button"
          onClick={() => router.push("/auth/signin")}
          className="rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 font-semibold shadow-sm"
        >
          ログインしてお気に入りを表示
        </button>
      </div>
    );
  }

  const repositories = data?.items || [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">お気に入り一覧</h2>
        <button
          type="button"
          onClick={onBack}
          className="rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
        >
          検索に戻る
        </button>
      </div>

      {allTitles.length === 0 ? (
        <p className="text-gray-600">お気に入り登録されているリポジトリはありません。</p>
      ) : isLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">お気に入り情報の取得に失敗しました。</p>
      ) : (
        <div className="space-y-6">
          <RepositoryCard repositories={repositories} />
        </div>
      )}
    </div>
  );
}

