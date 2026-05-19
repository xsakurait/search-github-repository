"use client";

import SearchForm from "@/src/features/github/search/components/SearchForm";
import Loading from "./loading";
import "@/src/app/globals.css";

import { lazy, Suspense, useState } from "react";
import { useSearchRepository } from "@/src/features/github/search/hooks/useSearchRepository";

const RepositoryList = lazy(
  () => import("@/src/features/github/search/components/RepositoryList"),
);

const SuspenseWrapper = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => {
  if (loading) {
    throw new Promise(() => {});
  }
  return <>{children}</>;
};

export default function Page() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const { defaultRepositories, repository, totalCount, loading, error, search } =
    useSearchRepository();

  const handleSearch = (newKeyword: string) => {
    setKeyword(newKeyword);
    setPage(1);
    search(newKeyword, 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    search(keyword, newPage);
  };

  return (
    <main
      className="
        max-w-7xl 
        mx-auto 
        px-6 
        py-10"
    >
      <h1 className="text-3xl font-bold mb-8">Github search repository</h1>
      <SearchForm onSearch={handleSearch}></SearchForm>

      {error && (
        <div
          className="
          bg-red-100
          text-red-700
          p-4
          rounded
          mb-6
        "
        >
          {error}
        </div>
      )}

      <Suspense fallback={<Loading />}>
        <SuspenseWrapper loading={loading}>
          <RepositoryList
            repositories={
              repository.length > 0 ? repository : defaultRepositories
            }
            page={page}
            setPage={handlePageChange}
            totalCount={totalCount}
          />
        </SuspenseWrapper>
      </Suspense>
    </main>
  );
}
