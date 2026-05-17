import { useState } from "react";

const PER_PAGE = 10;

type Props = {
  pages: number;
  setPage: (page: number) => void;
  repositories: number;
};

export default function Pagenation({ pages, setPage, repositories }: Props) {
  const totalPages = Math.ceil(repositories / PER_PAGE);

  return (
    <div className="flex items-center justify-center gap-4 pt-4">
      <button
        className="px-3 py-1 border rounded disabled:opacity-30"
        disabled={pages === 1}
        onClick={() => setPage(pages - 1)}
      >
        Prev
      </button>

      <span className="text-sm">
        {pages} / {totalPages || 1}
      </span>

      <button
        className="px-3 py-1 border rounded disabled:opacity-30"
        disabled={pages >= totalPages}
        onClick={() => setPage(pages + 1)}
      >
        Next
      </button>
    </div>
  );
}
