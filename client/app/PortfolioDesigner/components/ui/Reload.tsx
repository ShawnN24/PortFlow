import { useEffect } from "react";

function handleGithubAuth() {
  if (localStorage.getItem("githubAccessToken")) localStorage.removeItem("githubAccessToken");

  const clientId = process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID;
  const redirectUri = 'http://localhost:3000/PortfolioDesigner';
  const authUrl = new URL(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`);
  window.location.assign(authUrl);
}

export default function ReloadGithubAuth() {
  return(
    <button
      title='Refresh Data'
      onClick={handleGithubAuth}
      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-cw-icon lucide-refresh-cw"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
    </button>
  );
}