import { useRouter } from "next/navigation";

export default function GetStartedButton() {
  const router = useRouter();
  return(
    <button onClick={() => router.push("/GetStarted")} className="flex items-center text-nowrap transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-gray-900 dark:hover:bg-gray-200">
      Get Started
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m15 18 6-6-6-6"/></svg>
    </button>
  );
}