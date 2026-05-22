"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function AuthErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (err: string | null) => {
    if (!err) return "予期せぬエラーが発生しました。";
    switch (err) {
      case "Configuration":
        return "サーバー側の設定エラーです。設定を確認してください。";
      case "AccessDenied":
        return "アクセスが拒否されました。";
      case "Verification":
        return "確認用のリンクの期限が切れているか、すでに使用されています。";
      default:
        return "認証処理中にエラーが発生しました。もう一度お試しください。";
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-red-100 bg-white/80 p-8 shadow-xl backdrop-blur-md">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
            認証エラー
          </h2>
          <p className="mt-2 text-sm text-gray-600">{getErrorMessage(error)}</p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={() => router.replace("/auth/signin")}
            className="flex w-full items-center justify-center rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            ログインに戻る
          </button>
          <Link
            href="/github-search"
            className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
