import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import { ClerkProvider } from '@clerk/nextjs';
import TopBar from "../components/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LitHumDaddy",
  description: "Your Literature Study Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <ClerkProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-[260px]" style={{ overscrollBehaviorX: "auto" }}>
              <TopBar />
              {children}
            </main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
