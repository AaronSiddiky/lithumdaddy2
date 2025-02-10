import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LitHumDaddy",
  description: "Your Literature Study Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  //
}) {
  return (
    <ClerkProvider publishableKey="pk_test_c3BsZW5kaWQtYmx1ZWJpcmQtODIuY2xlcmsuYWNjb3VudHMuZGV2JA">
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
    </ClerkProvider>
  );
}
