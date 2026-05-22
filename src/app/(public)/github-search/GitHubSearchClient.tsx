"use client";

import SearchForm from "@/src/features/github/search/components/SearchForm";
import FavoriteFolderList from "@/src/features/github/search/components/FavoriteFolderList";
import Loading from "./loading";
import "@/src/app/globals.css";

import { lazy, Suspense, useState } from "react";
import { useSearchRepository } from "@/src/features/github/search/context/SearchRepositoryContext";

const RepositoryList = lazy(
  () => import("@/src/features/github/search/components/RepositoryList")
);

export default function GitHubSearchClient() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const {
    activeView,
    setActiveView,
    defaultRepositories,
    repository,
    totalCount,
    errorMessage,
    search,
    favoriteRepositories,
  } = useSearchRepository();

  const handleSearch = async (newKeyword: string) => {
    setPage(1);
    await search(newKeyword, 1);
  };

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    await search(keyword, newPage);
  };

  if (activeView === "favorites") {
    return (
      <div className="max-w-7xl py-4">
        <FavoriteFolderList
          favorites={favoriteRepositories}
          onBack={() => setActiveView("search")}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl py-4">
      <h1 className="mb-8 text-3xl font-bold">Github search repository</h1>
      <SearchForm
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
      />

      {errorMessage && (
        <div className="mb-6 rounded bg-red-100 p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      <Suspense fallback={<Loading />}>
        <RepositoryList
          repositories={repository.length > 0 ? repository : defaultRepositories}
          page={page}
          setPage={handlePageChange}
          totalCount={totalCount}
        />
      </Suspense>
    </div>
  );
}
