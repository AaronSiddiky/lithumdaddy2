"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function TopBar() {
  return (
    <div className="fixed top-0 right-0 p-4 flex items-center gap-4 z-10">
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
  );
}
