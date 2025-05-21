import { useEffect, useState } from "react";

function handleGithubAuth() {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID;
  const redirectUri = 'http://localhost:3000/GetStarted';
  const authUrl = new URL(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`);
  window.location.assign(authUrl);
}

export default function GithubAuthButton() {
  const [isGithubAccessToken, setGithubAccessToken] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("githubAccessToken")) setGithubAccessToken(true);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    async function fetchData() {
      if (code && !localStorage.getItem("githubAccessToken")) {
        try {
          const tokenRes = await fetch(`/api/getGithubAccessToken?code=${code}`);
          const tokenData = await tokenRes.json();
          const accessToken = tokenData.access_token;

          if (accessToken) {
            localStorage.setItem("githubAccessToken", accessToken);
            setGithubAccessToken(true);
            console.log("Access Token Response:", accessToken);

            // Remove the code from URL so it doesn’t get reused
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
          } else {
            console.error("No access token returned", tokenData);
          }
        } catch (err) {
          console.error("Error during GitHub auth flow", err);
        }
      }
    }
    
    fetchData();
  }, []);

  return(
    <button 
      onClick={handleGithubAuth}
      className={`w-60 transform rounded-lg px-6 py-2 font-medium transition-all duration-300 justify-items-center
        ${isGithubAccessToken ? 'bg-[#56b856] text-black' : 'bg-[#212830] hover:bg-[#29323d] hover:-translate-y-0.5 text-white'}`
      }
      disabled={isGithubAccessToken}
    >
      {isGithubAccessToken ? 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg> 
      : 
      <p>Github</p>
      }
    </button>
  );
}