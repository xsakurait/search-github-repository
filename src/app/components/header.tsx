import Link from "next/link";

export default function Footer() {
  return (
    <header className="fixed flex justify-between px-8 w-screen h-16 bg-teal-400 items-center drop-shadow-2xl border-b border-gray-300 shadow-md">
      <Link href="/" className="text-lg font-bold">
        SearchGithubRepository
      </Link>
    </header>
  );
}
