import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Platform",
  description: "Your Platform Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-[260px]">
            <TopBar />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
