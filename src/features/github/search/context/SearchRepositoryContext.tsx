"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import {
  Repository,
  SearchRepositoriesResponse,
} from "../types/repository";

export type FavoriteWithItems = {
  id: number;
  name: string;
  items: { id: number; itemId: string; itemTitle: string }[];
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

type SearchRepositoryContextValue = {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  defaultRepositories: Repository[];
  repository: Repository[];
  totalCount: number;
  loading: boolean;
  errorMessage: string;
  isMutating: boolean;
  search: (keyword: string, page?: number) => Promise<void>;
  favoriteRepositories: FavoriteWithItems[];
};

const SearchRepositoryContext =
  createContext<SearchRepositoryContextValue | null>(null);

export function SearchRepositoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeView, setActiveView] = useState<AppView>("search");
  const [defaultRepositories, setDefaultRepositories] = useState<Repository[]>(
    [],
  );
  const [repository, setRepository] = useState<Repository[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const [favoriteRepositories, setFavoriteRepositories] = useState<
    FavoriteWithItems[]
  >([]);
  const { data: session } = useSession();

  const { data, isLoading, error } = useSWR<SearchRepositoriesResponse>(
    "/api/github/search/defaultRepositories",
    fetcher,
  );
  const { data: favoriteData } = useSWR<FavoriteWithItems[]>(
    session?.user ? "/api/github/favorite/getRepositories" : null,
    fetcher,
  );

  useEffect(() => {
    if (data?.items) {
      setDefaultRepositories(data.items);
      setTotalCount(data.total_count);
    }
  }, [data]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      setErrorMessage("初期リポジトリの取得に失敗しました");
    }
  }, [error]);

  useEffect(() => {
    if (favoriteData) {
      setFavoriteRepositories(favoriteData);
    }
  }, [favoriteData]);

  useEffect(() => {
    if (!session?.user) {
      setFavoriteRepositories([]);
    }
  }, [session?.user]);

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
      setTotalCount(searchData.total_count);
    } catch (searchError) {
      console.error(searchError);
      setErrorMessage("リポジトリ取得に失敗しました");
    } finally {
      setLoading(false);
      setIsMutating(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      activeView,
      setActiveView,
      defaultRepositories,
      repository,
      totalCount,
      loading,
      errorMessage,
      isMutating,
      search,
      favoriteRepositories,
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
      favoriteRepositories,
    ],
  );

  return (
    <SearchRepositoryContext.Provider value={value}>
      {children}
    </SearchRepositoryContext.Provider>
  );
}

export function useSearchRepository() {
  const context = useContext(SearchRepositoryContext);
  if (!context) {
    throw new Error(
      "useSearchRepository must be used within SearchRepositoryProvider",
    );
  }
  return context;
}
