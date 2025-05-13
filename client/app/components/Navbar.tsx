"use client";

import { useRouter } from "next/navigation";
import GetStartedButton from "./ui/GetStartedButton";

export default function Navbar() {
  const router = useRouter();
  return(
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-violet-50`}
    >
      <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-[15%] py-4 dark:border-neutral-800">
        <button onClick={() => router.push("/")}>
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-full bg-gradient-to-br from-purple-400 to-blue-700" />
            <h1 className="text-3xl font-bold">PortFlow</h1>
          </div>
        </button>
        <GetStartedButton/>
      </nav>
    </header>
  );
}