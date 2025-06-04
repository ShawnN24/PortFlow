"use client";
 
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Marquee from "../ui/Marquee";
import RepoMetrics from "../ui/RepoMetrics";
 
export function Hero() {
  const router = useRouter();

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center">
      <div className="relative flex w-full items-center justify-center bg-white dark:bg-black">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        <div className="px-4 py-10 md:py-20">
          <p className="relative z-10 mx-auto max-w-4xl text-center font-bold text-7xl md:text-8xl lg:text-9xl">
            {`PortFlow`
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block bg-gradient-to-r from-purple-400 to-blue-800 bg-clip-text text-transparent"
                >
                  {word}
                </motion.span>
              ))}
          </p>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="relative z-10 mx-auto py-4 text-center text-3xl font-normal text-neutral-600 dark:text-neutral-400"
          >
            Create and deploy your personal portfolio website in less than a minute.
            <motion.p className="text-purple-600">
              Powered by Github & Resumes.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button onClick={() => router.push("/GetStarted")} className="w-full justify-center flex rounded-lg bg-purple-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-500">
              <div className="flex">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m15 18 6-6-6-6"/></svg>
              </div>
            </button>
          </motion.div>
          
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <RepoMetrics />
          </motion.div>
          
          <Marquee />
          <div className="p-17"></div>
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
              delay: 1.2,
            }}
            className="relative z-10 mt-15 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
              <Image
                src='/shawnn24.github.io_portflow-portfolio_.png'
                alt="PortFlow Portfolio Preview"
                className="h-auto w-full"
                height={1000}
                width={1000}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}