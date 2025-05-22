"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import PortfolioBuilder from "./components/PortfolioBuilder";

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  repos_url: string;
  name?: string;
  bio?: string;
}

interface GithubRepo {
  name: string;
  full_name: string;
  html_url: string;
  description?: string;
  languages_url: string;
  stargazers_url?: string;
  topics?: string[];
}

export default function PortfolioDesignerPage() {
  const defaultFormData = {
    name: "",
    email: "",
    skills: [],
    experiences: [
      {
        job_title: "",
        company: "",
        location: "",
        start_date: "",
        end_date: "",
        bullets: [""],
      },
    ],
  }
  // Handle Resume Data
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("formData");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          sessionStorage.removeItem("formData");
        }
      }
    }
    return defaultFormData;
  });
  useEffect(() => {
    const stored = sessionStorage.getItem("formData");
    if (stored) {
      setFormData(JSON.parse(stored));
    }
  }, []);

  // Handle Github Data
  const router = useRouter();
  const [isGithubData, setGithubData] = useState<{
    user: GithubUser;
    repos: GithubRepo[];
    languages: Record<string, string[]>;
  } | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("githubAccessToken");
    if (!accessToken) router.push("/GetStarted");

    async function fetchData() {
      const userRes = await fetch("/api/getGithubUserData", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await userRes.json();

      const repoRes = await fetch(`https://api.github.com/users/${userData.login}/repos`);
      const repoData = await repoRes.json();

      const res = await fetch('/colors.json');
      const colorData = await res.json();

      const langData = {};
      await Promise.all(
        repoData.map(async (repo: GithubRepo) => {
          try {
            const res = await fetch(repo.languages_url);
            const data = await res.json();
            langData[repo.name] = Object.entries(data).map(([lang, bytes]) => ({
              name: lang,
              bytes: bytes,
              color: colorData?.[lang]?.color
            }));
          } catch (error) {
            console.error(`Error fetching languages for ${repo.name}:`, error);
            langData[repo.name] = [];
          }
        })
      );

      setGithubData({
        user: userData,
        repos: repoData,
        languages: langData,
      });
      console.log("User Data:", userData);
    }
    
    fetchData();
  }, []);

  if (!formData || !isGithubData) return <p>Loading...</p>;

  return(
    <div>
      <Navbar/>
      <div className="">
        <PortfolioBuilder formData={formData} githubData={isGithubData} />
      </div>
    </div>
  );
}