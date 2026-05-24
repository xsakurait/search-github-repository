import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { Repository, SearchRepositoriesResponse } from "../types/repository";
import { useFavoriteStore } from "../../favorite/store/favoriteStore";

export type FavoriteWithItems = {
  id: number;
  name: string;
  items: { id: number; itemId: number; itemTitle: string }[];
};

export type AppView = "search" | "favorites";

const PER_PAGE = 10;

const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed");
  }
  return response.json() as Promise<T>;
};

export function useSearchRepository() {
  const activeView = useFavoriteStore((state) => state.activeView);
  const setActiveView = useFavoriteStore((state) => state.setActiveView);
  const [repository, setRepository] = useState<Repository[]>([]);
  const [searchTotalCount, setSearchTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const { data: session } = useSession();

  const { data } = useSWR<SearchRepositoriesResponse>(
    "/api/github/search/defaultRepositories",
    fetcher,
    {
      onError: () => setErrorMessage("初期リポジトリの取得に失敗しました"),
    },
  );

  const defaultRepositories = data?.items || [];
  const totalCount =
    repository.length > 0 ? searchTotalCount : (data?.total_count ?? 0);

  const { data: favoriteData } = useSWR<FavoriteWithItems[]>(
    session?.user ? "/api/github/favorite/getRepositories" : null,
    fetcher,
    {
      onError: () => setErrorMessage("お気に入り取得に失敗しました"),
    },
  );

  const search = useCallback(async (keyword: string, page = 1) => {
    setActiveView("search");
    setLoading(true);
    setIsMutating(true);
    setErrorMessage("");
    try {
      const params = new URLSearchParams({
        q: keyword,
        page: String(page),
        per_page: String(PER_PAGE),
      });
      const response = await fetch(
        `/api/github/search/repositories?${params.toString()}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const searchData = (await response.json()) as SearchRepositoriesResponse;
      setRepository(searchData.items);
      setSearchTotalCount(searchData.total_count);
    } catch (searchError) {
      console.error(searchError);
      setErrorMessage("リポジトリ取得に失敗しました");
    } finally {
      setLoading(false);
      setIsMutating(false);
    }
  }, []);

  return useMemo(
    () => ({
      activeView,
      setActiveView,
      defaultRepositories,
      repository,
      totalCount: repository.length > 0 ? totalCount : 10,
      loading,
      errorMessage,
      isMutating,
      search,
      favoriteData,
    }),
    [
      activeView,
      defaultRepositories,
      repository,
      totalCount,
      loading,
      errorMessage,
      isMutating,
      search,
      favoriteData,
    ],
  );
}
