"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FileUpload from "../components/ui/FileUpload";
import SkillSelector from "../components/ui/SkillSelector";
import GithubAuthButton from "../components/ui/GithubAuthButton";
import { useRouter } from "next/navigation";

export default function GetStartedPage() {
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
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState(() => {
    if (typeof window === "undefined") return defaultFormData;
    return sessionStorage.getItem("formData") ? JSON.parse(sessionStorage.getItem("formData")!) : defaultFormData;
  });

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
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
            "X-API-Key": "12ac34db-41e1-4fb0-8783-d7be98cb73a5"
          },
          body: fd,
        }),
        fetch("https://ai-resume-parser-4vtn.onrender.com/extract-experience", {
          method: "POST",
          headers: {
            "X-API-Key": "12ac34db-41e1-4fb0-8783-d7be98cb73a5"
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
        experiences: expData.experiences || [],
      });
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    const newExperience = {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      bullets: [""],
    };

    updateField("experiences", [...formData.experiences, newExperience]);
  };

  const deleteExperience = (index: number) => {
    const updated = [...formData.experiences];
    updated.splice(index, 1);
    updateField("experiences", updated);
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

        <div className="mt-6 space-y-4">
          <div>
            <label className="block font-semibold">Name</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={e => updateField("name", e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold">Email</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={e => updateField("email", e.target.value)}
            />
          </div>

          <SkillSelector skills={formData.skills} setSkills={(skills) => updateField("skills", skills)} />

          <div>
            <div className="flex justify-between items-center">
              <label className="font-semibold text-lg">Experiences</label>
              <button
                onClick={addExperience}
                disabled={formData.experiences.length >= 10}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Experience
              </button>
            </div>
            {formData.experiences.map((exp, idx) => (
              <div key={idx} className="p-4 border rounded my-2 space-y-2">
                <div className="flex justify-between gap-2">
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Job Title"
                    value={exp.job_title}
                    onChange={e => {
                      const newExp = [...formData.experiences];
                      newExp[idx].job_title = e.target.value;
                      updateField("experiences", newExp);
                    }}
                  />
                  {idx !== 0 && (
                    <button
                      onClick={() => deleteExperience(idx)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Company"
                  value={exp.company}
                  onChange={e => {
                    const newExp = [...formData.experiences];
                    newExp[idx].company = e.target.value;
                    updateField("experiences", newExp);
                  }}
                />
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Location"
                  value={exp.location}
                  onChange={e => {
                    const newExp = [...formData.experiences];
                    newExp[idx].location = e.target.value;
                    updateField("experiences", newExp);
                  }}
                />
                <div className="flex gap-2">
                  <input
                    className="w-1/2 p-2 border rounded"
                    placeholder="Start Date"
                    value={exp.start_date}
                    onChange={e => {
                      const newExp = [...formData.experiences];
                      newExp[idx].start_date = e.target.value;
                      updateField("experiences", newExp);
                    }}
                  />
                  <input
                    className="w-1/2 p-2 border rounded"
                    placeholder="End Date"
                    value={exp.end_date}
                    onChange={e => {
                      const newExp = [...formData.experiences];
                      newExp[idx].end_date = e.target.value;
                      updateField("experiences", newExp);
                    }}
                  />
                </div>
                <textarea
                  className="w-full p-2 border rounded my-1"
                  value={exp.bullets.join("\n")}
                  onChange={e => {
                    const newExp = [...formData.experiences];
                    newExp[idx].bullets = e.target.value.split("\n").filter(line => line.trim() !== "");
                    updateField("experiences", newExp);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <h2 className="text-2xl mt-4">Step 3: Generate your portfolio website.</h2>
        <p className="mb-4 text-gray-600">Ensure all information is filled out correctly.</p>
        <button onClick={() => handleGeneratePortfolio()} className="flex items-center text-nowrap transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Generate Portfolio Website
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m15 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}