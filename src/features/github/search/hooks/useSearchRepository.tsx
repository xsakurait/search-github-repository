"use client";

import { useCallback, useEffect, useState } from "react";

import { Repository, SearchRepositoriesResponse } from "../types/repository";

export const useSearchRepository = () => {
  const [defaultRepositories, setDefaultRepositories] = useState<Repository[]>(
    [],
  );
  const [repository, setRepository] = useState<Repository[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialize = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/github/search/defaultRepositories?q=stars:>1&sort=stars&order=desc&page=1&per_page=10`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch default repositories");
      }
      const data: SearchRepositoriesResponse = await res.json();
      setDefaultRepositories(data.items);
      setTotalCount(10); // 初期表示は1ページのみ（10件）
    } catch (err) {
      console.error(err);
      setError("初期リポジトリの取得に失敗しました");
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
      if (!res.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const data: SearchRepositoriesResponse = await res.json();
      setRepository(data.items);
      setTotalCount(data.total_count); // 検索時は全体のヒット件数を設定
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
    totalCount,
    loading,
    error,
    search,
  };
};
