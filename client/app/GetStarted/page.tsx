"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FileUpload from "../components/ui/FileUpload";
import SkillSelector from "../components/ui/SkillSelector";
import GithubAuthButton from "../components/ui/GithubAuthButton";
import { useRouter } from "next/navigation";
import ExperienceForm from "../components/ui/ExperienceForm";
import PictureUpload from "../components/ui/PictureUpload";

interface Experience {
  job_title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  bullets: string[];
}

interface MyFormData {
  name: string;
  email: string;
  linkedIn: string;
  bio: string;
  profile_image: string | ArrayBuffer | null;
  skills: string[];
  experiences: Experience[];
}

export default function GetStartedPage() {
  // const SkillSelector = dynamic(() => import('../components/ui/SkillSelector'), { ssr: false });
  const defaultFormData = {
    name: "",
    email: "",
    linkedIn: "",
    bio: "",
    profile_image: "",
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
  const [file, setFile] = useState<File | null>(null);
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
  
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, []);

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      sessionStorage.setItem("resumeUrl", objectUrl);
    }
  };

  const handleParse = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const [parseRes, expRes] = await Promise.all([
        fetch("https://ai-resume-parser-4vtn.onrender.com/parse", {
          method: "POST",
          headers: {
            "X-API-Key": `${process.env.NEXT_PUBLIC_X_API_KEY}`
          },
          body: fd,
        }),
        fetch("https://ai-resume-parser-4vtn.onrender.com/extract-experience", {
          method: "POST",
          headers: {
            "X-API-Key": `${process.env.NEXT_PUBLIC_X_API_KEY}`
          },
          body: fd
        }),
      ]);

      if (!parseRes.ok || !expRes.ok) throw new Error("Error parsing file.");

      const parseData = await parseRes.json();
      const expData = await expRes.json();
      console.log(parseData);
      console.log(expData);

      setFormData({
        name: parseData.name || "",
        email: parseData.email || "",
        skills: parseData.skills || [""],
        experiences: expData.experiences || [
          {
            job_title: "",
            company: "",
            location: "",
            start_date: "",
            end_date: "",
            bullets: [""],
          },
        ],
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateField = <K extends keyof MyFormData>(field: string, value: MyFormData[K]) => {
    setFormData((prev: MyFormData) => ({ ...prev, [field]: value }));
  };

  const isFormComplete = () => {
    return (
      formData.name?.trim() &&
      formData.email?.trim() &&
      formData.skills?.length > 0 &&
      formData.experiences?.length > 0
    );
  };

  const isGitHubAuthorized = () => {
    return !!localStorage.getItem("githubAccessToken");
  };

  const handleGeneratePortfolio = () => {
    if (!isGitHubAuthorized()) {
      alert("Please authenticate with GitHub before continuing.");
      return;
    }
    
    if (!isFormComplete()) {
      alert("Please fill in all required fields before continuing.");
      return;
    }

    router.push("/PortfolioDesigner");
  };

  return (
    <div>
      <Navbar/>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">Getting Started with PortFlow</h1>
        <h2 className="text-2xl mt-4">Step 1: Authorize PortFlow with your Github account.</h2>
        <p className="mb-4 text-gray-600">We require this in order to grab profile and repository information.</p>
        <GithubAuthButton/>
        <h2 className="text-2xl mt-4">Step 2: Fill out the following resume information.</h2>
        <p className="mb-4 text-gray-600">Upload your resume below to auto-fill your information.</p>

        <div className="flex justify-between">
          <FileUpload onChange={handleFileChange} />
          <button
            onClick={handleParse}
            disabled={loading || !file}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {loading ? "Parsing..." : "Parse Resume"}
          </button>
        </div>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Prevent Hydration Error */}
        {isClient && 
          <div className="mt-6 space-y-4">
            <PictureUpload formData={formData} setPicture={(field, value) => updateField(field, value)} />

            <div>
              <label className="block font-semibold">Name <span className="text-red-500">*</span></label>
              <input
                className="w-full p-2 border rounded"
                value={formData.name ?? ""}
                onChange={e => updateField("name", e.target.value)}
                maxLength={50}
              />
            </div>

            <div>
              <label className="block font-semibold">Email <span className="text-red-500">*</span></label>
              <input
                className="w-full p-2 border rounded"
                value={formData.email ?? ""}
                onChange={e => updateField("email", e.target.value)}
                maxLength={50}
              />
            </div>

            <div>
              <label className="block font-semibold">LinkedIn Link <span className="text-gray-400">(optional)</span></label>
              <input
                className="w-full p-2 border rounded"
                value={formData.linkedIn ?? ""}
                onChange={e => updateField("linkedIn", e.target.value)}
                maxLength={100}
              />
            </div>

            <div>
              <label className="block font-semibold">Bio <span className="text-gray-400">(optional)</span></label>
              <textarea
                className="w-full p-2 border rounded"
                rows={4}
                value={formData.bio ?? ""}
                onChange={e => updateField("bio", e.target.value)}
                maxLength={1000}
              />
            </div>

            <SkillSelector skills={formData.skills} setSkills={(skills) => updateField("skills", skills)} />

            <ExperienceForm experiences={formData.experiences} setExperiences={(experiences) => updateField("experiences", experiences)} />
            
          </div>
        }

        <h2 className="text-2xl mt-4">Step 3: Generate your portfolio website.</h2>
        <p className="mb-4 text-gray-600">Ensure all information is filled out correctly.</p>
        <button onClick={() => handleGeneratePortfolio()} className="flex items-center text-nowrap transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800  dark:bg-gray-900 dark:hover:bg-gray-200">
          Generate Portfolio Website
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m15 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}