'use client';

import { UserProfile } from "@clerk/nextjs";

export default function Settings() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>
      
      <div className="bg-neutral-900 rounded-xl p-6">
        <UserProfile 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-transparent shadow-none",
              navbar: "hidden",
              pageScrollBox: "p-0",
              accordionTriggerButton: "hover:bg-neutral-800",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
              formButtonReset: "hover:bg-neutral-800",
            },
          }}
        />
      </div>
    </div>
  );
} 