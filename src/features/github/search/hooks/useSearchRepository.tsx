"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchDefaultRepositories, fetchRepository } from "../api/githubApi";

import { Repository, SearchRepositoriesResponse } from "../types/repository";

export function useSearchRepository() {
  const [defaultRepositories, setDefaultRepositories] = useState<Repository[]>([]);
  const [repository, setRepository] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialize = useCallback(async () => {
    const data = await fetchDefaultRepositories();
    setDefaultRepositories(data.items);
  }, []);
  useEffect(() => {
    initialize();
  }, [initialize]);
  async function search(keyword: string) {
    try {
      setLoading(true);

      setError("");
      const data: SearchRepositoriesResponse = await fetchRepository(keyword);
      setRepository(data.items);
    } catch (error) {
      console.error(error);

      setError("リポジトリ取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return {
    defaultRepositories,
    repository,
    loading,
    error,
    search,
  };
}
