/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "@/src/app/components/header";
import { useSession } from "next-auth/react";
import { useSearchRepository } from "@/src/features/github/search/hooks/useSearchRepository";
import { usePathname, useRouter } from "next/navigation";

// モック定義
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("@/src/features/github/search/hooks/useSearchRepository", () => ({
  useSearchRepository: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, onClick }: any) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

describe("Header Component", () => {
  const mockPush = vi.fn();
  const mockSetActiveView = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    (usePathname as any).mockReturnValue("/github-search");
    (useSession as any).mockReturnValue({
      data: { user: { name: "Test User", email: "test@example.com" } },
      status: "authenticated",
    });
    (useSearchRepository as any).mockReturnValue({
      favoriteData: [
        {
          id: 1,
          name: "Default Folder",
          items: [{ id: 1, itemId: 1234, itemTitle: "facebook/react" }],
        },
      ],
      setActiveView: mockSetActiveView,
    });
  });

  it("お気に入り一覧をクリックした時、正しくビューが favorites に切り替わる", () => {
    render(<Header />);

    // メニューを開く
    const menuButton = screen.getByText("☰ メニュー");
    fireEvent.click(menuButton);

    // お気に入り一覧ボタンを見つける
    const favLink = screen.getByText("お気に入り一覧");
    fireEvent.click(favLink);

    expect(mockSetActiveView).toHaveBeenCalledWith("favorites");
  });

  it("リポジトリ検索をクリックした時、正しくビューが search に切り替わる", () => {
    render(<Header />);

    // メニューを開く
    const menuButton = screen.getByText("☰ メニュー");
    fireEvent.click(menuButton);

    // リポジトリ検索ボタンを見つける
    const searchLink = screen.getByText("リポジトリ検索");
    fireEvent.click(searchLink);

    expect(mockSetActiveView).toHaveBeenCalledWith("search");
  });
});
