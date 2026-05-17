"use client";

import { useCallback, useEffect, useState } from "react";

import { Repository, SearchRepositoriesResponse } from "../types/repository";

export const useSearchRepository = () => {
  const [defaultRepositories, setDefaultRepositories] = useState<Repository[]>(
    [],
  );
  const [repository, setRepository] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialize = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/github/search/defaultRepositories?q=stars:>1&sort=stars&order=desc&page=1&per_page=10`,
      );
      const data: SearchRepositoriesResponse = await res.json();
      setDefaultRepositories(data.items);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const search = async (keyword: string, page = 1) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `/api/github/search/repositories?q=${keyword}&page=${page}`,
      );
      const data: SearchRepositoriesResponse = await res.json();
      setRepository(data.items);
    } catch (err) {
      console.error(err);
      setError("リポジトリ取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return {
    defaultRepositories,
    repository,
    loading,
    error,
    search,
  };
};
