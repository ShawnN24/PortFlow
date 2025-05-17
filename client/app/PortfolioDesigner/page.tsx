"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import PortfolioBuilder from "./components/PortfolioBuilder";

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
    user: any;
    repos: any[];
    languages: Record<string, string[]>;
  } | null>(null);
  const [repos, setRepos] = useState([]);
  const [languagesMap, setLanguagesMap] = useState({});
  useEffect(() => {
    const accessToken = localStorage.getItem("githubAccessToken");
    if (!accessToken) router.push("/GetStarted");

    async function fetchData() {
      const userRes = await fetch("http://localhost:4000/getGithubUserData", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await userRes.json();

      const repoRes = await fetch(`https://api.github.com/users/${userData.login}/repos`);
      const repoData = await repoRes.json();
      setRepos(repoData);

      const langData = {};
      await Promise.all(
        repoData.map(async (repo) => {
          try {
            const res = await fetch(repo.languages_url);
            const data = await res.json();
            langData[repo.name] = Object.keys(data);
          } catch (error) {
            console.error(`Error fetching languages for ${repo.name}:`, error);
            langData[repo.name] = [];
          }
        })
      );
      setLanguagesMap(langData);

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
      <div className="mb-[8%]">
        <PortfolioBuilder formData={formData} githubData={isGithubData} />
        {/* <h1 className="mt-100 text-3xl font-bold">{formData.name}</h1>
        <p className="text-gray-600">{formData.email}</p>

        <h2 className="mt-6 text-xl font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, idx) => (
            <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{skill}</span>
          ))}
        </div>

        <h2 className="mt-6 text-xl font-semibold">Experience</h2>
        {formData.experiences.map((exp, idx) => (
          <div key={idx} className="mt-4 border-l-4 border-black pl-4">
            <p className="font-semibold">{exp.job_title} at {exp.company}</p>
            <p className="text-sm text-gray-500">{exp.start_date} – {exp.end_date}</p>
            <ul className="list-disc ml-6 mt-1 text-sm">
              {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}

        <h2 className="mt-6 text-xl font-semibold">GitHub Highlights</h2>
        <p className="text-sm text-gray-600">Username: {isGithubData.login}</p>
        <p className="text-sm text-gray-600">Public Repos: {isGithubData.public_repos}</p>
        <a href={isGithubData.html_url} className="text-blue-500 underline" target="_blank">
          View GitHub Profile
        </a> */}
      </div>
    </div>
  );
}