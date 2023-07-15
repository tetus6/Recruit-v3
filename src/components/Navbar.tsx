"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="flex-between mb-8 mt-4 w-full pt-3">
      <Link href="/" className="flex-center flex gap-2">
        <p className="logo_text">Recruit</p>
      </Link>
      <Auth /> 
    </nav>
    
  );
};

export default Navbar;


function Auth() {
    const { data: session } = useSession();
  
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-black">
          {session && <span>Logged in as {session.user?.name}</span>}
        </p>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
          onClick={session ? () => void signOut() : () => void signIn()}
        >
          {session ? "Sign out" : "Sign in"}
        </button>
      </div>
    );
  }''