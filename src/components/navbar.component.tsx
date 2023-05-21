"use client";

import { signOut, useSession } from "next-auth/react";
import Logo from "./logo.component";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-black/30">
      <div className="container mx-auto py-8 flex justify-between">
        <Logo />
        {status === "loading" && <div>Loading...</div>}
        {status === "authenticated" && (
          <div className="flex items-center">
            <div className="mr-4">{session.user?.email}</div>
            <button
              className="bg-white text-black px-4 py-2 rounded"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
