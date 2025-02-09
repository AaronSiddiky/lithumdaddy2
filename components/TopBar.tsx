"use client";

import Link from "next/link";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import ChatInterface from "./ChatInterface";

export default function TopBar() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 right-0 p-4 flex items-center gap-4 z-10">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="px-4 py-2 rounded-full border border-neutral-800 hover:bg-neutral-800 transition-colors"
        >
          {isChatOpen ? "Close Chat" : "Open Chat"}
        </button>
        <div className="flex items-center gap-4">
          <SignedOut>
            <Link
              href="/pricing"
              className="px-4 py-2 rounded-full border border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
            >
              Unlimited Access
            </Link>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-full border border-neutral-800 hover:bg-neutral-800 transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/settings"
              className="px-4 py-2 rounded-full border border-neutral-800 hover:bg-neutral-800 transition-colors"
            >
              Settings
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  rootBox: "flex items-center",
                  userButtonTrigger: "focus:shadow-none",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>

      {/* Chat Interface - Updated container */}
      {isChatOpen && (
        <div className="fixed top-[72px] bottom-0 right-4 w-[400px] bg-neutral-900 rounded-t-xl shadow-2xl border border-neutral-800 flex overflow-hidden">
          <ChatInterface bookTitle="General Chat" />
        </div>
      )}
    </>
  );
}
