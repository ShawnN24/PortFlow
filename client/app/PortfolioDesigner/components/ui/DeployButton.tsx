import { useState } from "react";
import generateStaticMarkup from "../PortfolioTemplate";

export default function DeployButton({ formData, githubData, activeLayout, components, themeColor, isDarkMode }) {
  const [repoUrl, setRepoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem('githubAccessToken');

  const handleDeploy = async () => {
    if(loading) return;
    console.log("🚀 Deploy triggered");
    setLoading(true);
    try {
      const html = generateStaticMarkup({
        formData,
        githubData,
        activeLayout,
        components,
        themeColor,
        isDarkMode,
      });

      const response = await fetch('/api/github/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html,
          formData,
          githubData,
          repoName: 'portflow-portfolio',
          accessToken,
        }),
      });

      const result = await response.json();
      alert(`${result.message}`);
      setRepoUrl(result.siteUrl);
    } catch (err) {
      alert('❌ Deploy failed!');
      console.error('❌ Deploy failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        disabled={loading}
        title="Deploy"
        onClick={handleDeploy}
        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket-icon lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
      </button>

      {repoUrl && (
        <div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded flex mt-2">
            <a title="View Website" href={repoUrl} target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
            </a>
          </button>
          <button className="bg-[#343f4b] hover:bg-[#212830] text-white p-2 rounded flex mt-2">
            <a title="View Repository" href={`${githubData.user.html_url}/portflow-portfolio`} target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
          </button>
        </div>
      )}
    </div>
  );
}