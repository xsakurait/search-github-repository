"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FavoriteWithItems } from "../hooks/useSearchRepository";

type Props = {
  favorites: FavoriteWithItems[] | undefined;
  onBack: () => void;
};

export default function FavoriteFolderList({ favorites }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session?.user) {
    return (
      <div>
        <h2 className="mb-4 text-2xl font-bold">マイフォルダ一覧</h2>
        <p className="mb-4 text-gray-600">
          お気に入りはログインユーザーごとに管理されています。
        </p>
        <button
          type="button"
          onClick={() => router.push("/auth/signin")}
          className="rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 font-semibold shadow-sm"
        >
          ログインしてフォルダを表示
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">マイフォルダ一覧</h2>

      {favorites?.length === 0 ? (
        <p className="text-gray-600">フォルダがありません</p>
      ) : (
        <div className="space-y-6">
          {favorites?.map((fav) => (
            <section
              key={fav.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold">📁 {fav.name}</h3>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {fav.items.length} 件
                </span>
              </div>

              {fav.items.length === 0 ? (
                <p className="text-sm italic text-gray-500">
                  アイテムがありません
                </p>
              ) : (
                <ul className="space-y-2 border-l-2 border-gray-200 pl-4">
                  {fav.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`https://github.com/${item.itemTitle}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        📄 {item.itemTitle}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
