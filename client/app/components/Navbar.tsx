export default function Navbar() {
  return(
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-violet-50`}
    >
      <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-[15%] py-4 dark:border-neutral-800">
        <button>
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-full bg-gradient-to-br from-purple-400 to-blue-700" />
            <h1 className="text-3xl font-bold">PortFlow</h1>
          </div>
        </button>
        <button className="flex items-center text-nowrap transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Get Started
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m15 18 6-6-6-6"/></svg>
        </button>
      </nav>
    </header>
  );
}