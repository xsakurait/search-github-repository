import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "./components/footer";
import Header from "./components/header";
import AuthProvider from "@/src/components/providers/AuthProvider";


const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={cn("font-sans", geist.variable)}>
      <body className="bg-gray-50 text-gray-900">
        <AuthProvider>
          <Header />
          <main className="mx-auto max-w-4xl p-6 pt-24">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
