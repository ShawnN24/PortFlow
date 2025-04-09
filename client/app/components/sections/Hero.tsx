"use client";
 
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import handleGithubAuth from "@/lib/api/github";
import handleLinkedInAuth from "@/lib/api/linkedin";
import { githubAuth, loginWithGithub } from "@/lib/auth";
 
export function Hero() {
  const [isGithub, setGithub] = useState();
  const [isLinkedIn, setLinkedIn] = useState();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);
  }, [])

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
              Powered by Github & LinkedIn.
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
            <button 
              onClick={() => {
                githubAuth();
              }}
              className="w-60 transform rounded-lg bg-[#212830] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#29323d] dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Github
            </button>
            <button
              onClick={() => {
                console.log(handleLinkedInAuth("shawnn24"));
              }}
              className="w-60 transform rounded-lg border border-gray-300 bg-[#0077B5] px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0085cc] dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900"
            >
              LinkedIn
            </button>
          </motion.div>
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
            className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
              <Image
                src="https://assets.aceternity.com/pro/aceternity-landing.webp"
                alt="Landing page preview"
                className="aspect-[16/9] h-auto w-full object-cover"
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