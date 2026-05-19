import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "./components/footer";
import Header from "./components/header";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={cn("font-sans", geist.variable)}>
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <main className="max-w-4xl mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
