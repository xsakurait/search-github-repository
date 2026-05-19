import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/app/components/ui/pagination";
import "@/src/app/globals.css";

const PER_PAGE = 10;

type Props = {
  pages: number;
  setPage: (page: number) => void;
  repositories: number;
};

export default function Pagenation({ pages, setPage, repositories }: Props) {
  const totalPages = Math.ceil(repositories / PER_PAGE);
  return (
    <Pagination className="flex items-center justify-center gap-6 pt-8 w-full whitespace-nowrap">
      <PaginationContent>
        <PaginationPrevious
          className="cn(px-6 py-3 border rounded pages===1&&disabled:opacity-30 text-lg)"
          onClick={() => {
            if (pages < totalPages) {
              setPage(pages - 1);
            }
          }}
        >
          Previous
        </PaginationPrevious>

        <PaginationItem className="text-lg font-semibold">
          {pages} / {totalPages || 1}
        </PaginationItem>

        <PaginationNext
          className="px-6 py-3 border rounded pages>=totalPages&&disabled:opacity-30 text-lg"
          onClick={() => {
            if (pages < totalPages) {
              setPage(pages + 1);
            }
          }}
        >
          Next
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  );
}
