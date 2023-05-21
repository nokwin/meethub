"use client";

import { signOut, useSession } from "next-auth/react";
import Button from "./button.component";
import Logo from "./logo.component";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-black/30 mb-8">
      <div className="container mx-auto py-8 flex justify-between">
        <Logo />
        {status === "loading" && <div>Loading...</div>}
        {status === "authenticated" && (
          <div className="flex items-center">
            <div className="mr-4 text-white font-bold">
              {session.user?.name}
            </div>
            <Button onClick={() => signOut()}>Sign out</Button>
          </div>
        )}
      </div>
    </div>
  );
}
