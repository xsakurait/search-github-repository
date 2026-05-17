import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">
        <header className="border-b bg-white px-6 py-4">
          <Link href="/" className="text-lg font-bold">
            SearchGithubRepository
          </Link>
        </header>

        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
