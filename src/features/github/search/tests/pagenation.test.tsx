process.env.DATABASE_URL = "postgresql://mock:mock@localhost:5432/mock";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Pagination from "@/src/features/github/search/components/Pagenation";
import RepositoryList from "@/src/features/github/search/components/RepositoryList";

// Next.js Link や Image のモックが必要な場合に対応
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));
vi.mock("next/link", () => ({
  default: ({ children, href, onClick }: any) => <a href={href} onClick={onClick}>{children}</a>,
}));
vi.mock("../../favorite/store/favoriteStore", () => ({
  useFavoriteStore: vi.fn(() => []),
}));
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(() => ({ data: { user: { id: 1 } }, status: "authenticated" })),
}));
vi.mock("@/src/features/github/search/hooks/useSearchRepository", () => ({
  useSearchRepository: vi.fn(() => ({
    favoriteData: [],
  })),
}));

describe("Pagination", () => {
  it("Nextボタンでpageが1加算", () => {
    const setPage = vi.fn();

    render(
      <Pagination
        pages={1}
        setPage={setPage}
        repositories={100}
      />
    );

    const button = screen.getByLabelText("Go to next page");
    fireEvent.click(button);

    expect(setPage).toHaveBeenCalledWith(2);
  });

  it("1ページ目の時は戻れない", () => {
    const setPage = vi.fn();

    render(
      <Pagination
        pages={1}
        setPage={setPage}
        repositories={100}
      />
    );

    const prevButton = screen.getByLabelText("Go to previous page");
    expect(prevButton.className).toContain("pointer-events-none");

    fireEvent.click(prevButton);
    expect(setPage).not.toHaveBeenCalled();
  });
});

describe("RepositoryList & Pagination 表示条件", () => {
  it("初期表示（リポジトリ総数が10件以下）の時はPaginationが表示されていない", () => {
    const setPage = vi.fn();
    const mockRepositories = [
      {
        id: 1,
        name: "repo1",
        full_name: "owner/repo1",
        html_url: "https://github.com/owner/repo1",
        description: "Test Repository",
        owner: { login: "owner", avatar_url: "/avatar.png" },
        stargazers_count: 10,
        watchers_count: 10,
        forks_count: 5,
        open_issues_count: 0,
        language: "TypeScript",
      },
    ];

    render(
      <RepositoryList
        repositories={mockRepositories}
        page={1}
        setPage={setPage}
        totalCount={1}
      />
    );

    expect(screen.queryByLabelText("Go to next page")).toBeNull();
    expect(screen.queryByLabelText("Go to previous page")).toBeNull();
  });
});