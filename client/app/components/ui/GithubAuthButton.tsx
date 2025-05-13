import { useEffect, useState } from "react";

export default function GithubAuthButton() {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID;
  const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;
  const redirectUri = 'http://localhost:3000/GetStarted';

  const [isGithubAccessToken, setGithubAccessToken] = useState(false);
  const [isUserData, setUserData] = useState<string | null>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    async function fetchData() {
      if (code) {
        try {
          let tokenRes;
          let tokenData;
          
          // Step 1: Grab access token
          if(!localStorage.getItem("githubAccessToken")) {
            tokenRes = await fetch(`http://localhost:4000/getGithubAccessToken?code=${code}`);
            tokenData = await tokenRes.json();
            localStorage.setItem("githubAccessToken", tokenData.access_token);
          } else {
            tokenData!.access_token = localStorage.getItem("githubAccessToken")
          }
          setGithubAccessToken(true);
          console.log("Access Token Response:", tokenData.access_token);

          // Step 2: Fetch user data with access token
          const userRes = await fetch("http://localhost:4000/getGithubUserData", {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          });
          const userData = await userRes.json();
          setUserData(userData);
          console.log("User Data:", userData);
        } catch (err) {
          console.error("Error during GitHub auth flow", err);
        }
      }
    }
    
    fetchData();
  }, []);

  function handleGithubAuth() {
    const authUrl = new URL(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`);
    window.location.assign(authUrl);
  }

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