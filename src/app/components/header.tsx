"use client";

import { useSearchRepository } from "@/src/features/github/search/context/SearchRepositoryContext";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { favoriteRepositories, setActiveView } = useSearchRepository();
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const openFavoritesView = () => {
    if (!session?.user) {
      signIn("github");
      return;
    }
    setActiveView("favorites");
    setIsOpen(false);
    if (pathname !== "/github-search") {
      router.push("/github-search");
    }
  };

  const openSearchView = () => {
    setActiveView("search");
    setIsOpen(false);
    if (pathname !== "/github-search") {
      router.push("/github-search");
    }
  };

  return (
    <header className="fixed z-50 flex h-16 w-screen items-center justify-between border-b border-gray-300 bg-teal-400 px-8 shadow-md drop-shadow-2xl">
      <Link
        href="/github-search"
        className="text-lg font-bold"
        onClick={openSearchView}
      >
        SearchGithubRepository
      </Link>

      <div className="flex items-center gap-3">
        {status === "loading" ? (
          <span className="text-sm">...</span>
        ) : session?.user ? (
          <div className="flex items-center gap-2">
            {session.user.image && (
              <img
                src={session.user.image}
                alt=""
                className="h-8 w-8 rounded-full"
              />
            )}
            <span className="hidden text-sm sm:inline">
              {session.user.name ?? session.user.email}
            </span>
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded bg-teal-600 px-3 py-1 text-sm text-white hover:bg-teal-700"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => signIn("github")}
            className="rounded bg-teal-600 px-3 py-1 text-sm text-white hover:bg-teal-700"
          >
            Github/Googleアカウントでログイン
          </button>
        )}

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded px-3 py-1 hover:bg-teal-500"
          >
            ☰ メニュー
          </button>

          {isOpen && (
            <div className="absolute top-12 right-0 z-50 max-h-[80vh] w-72 overflow-y-auto rounded-lg bg-gray-900 p-4 shadow-xl">
              <button
                type="button"
                onClick={openFavoritesView}
                className="mb-3 w-full rounded border-b border-gray-700 pb-2 text-left font-bold text-yellow-400 hover:text-yellow-300"
              >
                お気に入り一覧
              </button>

              <button
                type="button"
                onClick={openSearchView}
                className="mb-4 w-full text-left text-sm text-gray-300 hover:text-white"
              >
                リポジトリ検索
              </button>

              {!session?.user ? (
                <p className="text-xs text-gray-500">
                  お気に入りを見るにはログインしてください
                </p>
              ) : favoriteRepositories.length === 0 ? (
                <p className="text-xs text-gray-500">フォルダがありません</p>
              ) : (
                favoriteRepositories.map((fav) => (
                  <div key={fav.id} className="mb-4">
                    <div className="flex justify-between text-sm font-semibold text-gray-300">
                      <span>📁 {fav.name}</span>
                      <span className="rounded-full bg-gray-700 px-2 text-xs text-gray-400">
                        {fav.items.length}
                      </span>
                    </div>
                    <ul className="ml-2 mt-1 space-y-1 border-l border-gray-700 pl-4">
                      {fav.items.length === 0 ? (
                        <li className="text-xs italic text-gray-500">
                          アイテムがありません
                        </li>
                      ) : (
                        fav.items.map((item) => (
                          <li
                            key={item.id}
                            className="text-xs text-gray-400 hover:text-yellow-400"
                          >
                            📄 {item.itemTitle}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
