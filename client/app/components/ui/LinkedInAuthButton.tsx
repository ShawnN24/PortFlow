import { useEffect, useState } from "react";

export default function LinkedInAuthButton() {
  const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
  const redirectUri = 'http://localhost:3000/';

  const [isLinkedInAccessToken, setLinkedInAccessToken] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    async function fetchData() {
      if (code) {
        try {
          let tokenRes;
          let tokenData;

          // Step 1: Get access token
          if(!localStorage.getItem("linkedInAccessToken")) {
            tokenRes = await fetch(`http://localhost:4000/getLinkedInAccessToken?code=${code}`);
            tokenData = await tokenRes.json();
            console.log("Access Token Response:", tokenData);
          } else {
            tokenData!.access_token = localStorage.getItem("linkedInAccessToken");
          }
          setLinkedInAccessToken(true);
  
          // Step 2: Now that token is set, fetch user data
          const userRes = await fetch("http://localhost:4000/getLinkedInUserData", {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          });
          const userData = await userRes.json();
          console.log("User Data:", userData);
        } catch (err) {
          console.error("Error during LinkedIn auth flow", err);
        }
      }
    }
    
    fetchData();
  }, []);

  function handleLinkedInAuth() {
    const authUrl = new URL(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid%20profile%20email`);
    window.location.assign(authUrl);
    console.log(`AUTHURL:${authUrl}`);
  }

  return(
    <button
      onClick={handleLinkedInAuth}
      className={`w-60 transform rounded-lg px-6 py-2 font-medium transition-all duration-300 justify-items-center
        ${isLinkedInAccessToken ? 'bg-[#56b856] text-black' : 'bg-[#0077B5] hover:bg-[#0085cc] hover:-translate-y-0.5 text-white'}`
      }
      disabled={isLinkedInAccessToken}
    >
      {isLinkedInAccessToken ? 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg> 
      : 
      <p>LinkedIn</p>
      }
    </button>
  );
}