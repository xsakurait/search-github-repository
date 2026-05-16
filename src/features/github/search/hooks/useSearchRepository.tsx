"use client";

import { useState } from "react";

import { fetchRepositories } from "../api/githubApi";

import { Repository, SearchRepositoriesResponse } from "../types/repository";

export function useSearchRepository() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function search(keyword: string) {
    try {
      setLoading(true);

      setError("");

      const data: SearchRepositoriesResponse = await fetchRepositories(keyword);

      setRepositories(data.items);
    } catch (error) {
      console.error(error);

      setError("リポジトリ取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return {
    repositories,
    loading,
    error,
    search,
  };
}
