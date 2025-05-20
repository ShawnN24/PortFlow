import { useState } from "react";
import generateStaticMarkup from "../PortfolioTemplate";

export default function DeployButton({ formData, githubData, activeLayout, components, themeColor, isDarkMode }) {
  const [repoUrl, setRepoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem('githubAccessToken');

  const handleDeploy = async () => {
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
      alert(result.message || 'Deployment complete!');
      if (response.ok) {
        setRepoUrl(result.url);
        alert('Portfolio deployed successfully!');
      } else {
        alert(`Deployment failed: ${result.message}`);
      }
    } catch (err) {
      console.error('Deploy failed:', err);
      alert('Deployment failed. Check console for details.');
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
        {loading ? 'Deploying...' : 'Deploy'}
      </button>

      {repoUrl && (
        <div className="mt-4">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Open Deployed Portfolio
          </a>

          <div className="mt-2 border rounded overflow-hidden" style={{ width: '100%', height: '500px' }}>
            <iframe
              src={repoUrl}
              title="Portfolio Preview"
              style={{ width: '100%', height: '100%', border: 'none' }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}
    </div>
  );
}