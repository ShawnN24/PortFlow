import { useEffect, useState } from "react";

export default function GithubAuthButton() {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID;
  const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;
  const redirectUri = 'http://localhost:3000/';

  const [isCode, setCode] = useState<string | null>();
  const [isState, setState] = useState<string | null>();
  const [isTrueState, setTrueState] = useState<string | null>();
  const [userData, setUserData] = useState({});
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    setCode(code);
    setState(state);

    if(code && (localStorage.getItem("accessToken") === null)) {
      async function getAccessToken() {
        await fetch(`http://localhost:4000/getAccessToken?code=${code}`, {
          method: "GET"
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);
          if(data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            setRerender(!rerender);
          }
        });
      }
      getAccessToken();
    }
  }, [rerender]);

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem("accessToken")}` // Bearer ACCESSTOKEN
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      setUserData(data);
    })
  };

  function loginWithGithub(state: string) {
    const authUrl = new URL(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`);
    window.location.assign(authUrl);
    console.log(`AUTHURL:${authUrl}`);
  }

  function handleGithubAuth() {
    // Create random id to ensure security
    setTrueState(crypto.randomUUID());
    if(isTrueState) loginWithGithub(isTrueState);
  }

  return(
    <div>
      <button 
        onClick={handleGithubAuth}
        className={`w-60 transform rounded-lg px-6 py-2 font-medium transition-all duration-300 justify-items-center
          ${isCode ? 'bg-[#56b856] text-black' : 'bg-[#212830] hover:bg-[#29323d] hover:-translate-y-0.5 text-white'}`
        }
        disabled={!isCode}
      >
        {isCode ? 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg> 
        : 
        <p>Github</p>
        }
      </button>
    {localStorage.getItem("accessToken") &&
    <><button className="bg-white" onClick={getUserData}>{`USER DATA`}</button></>
    }
    </div>
  );
}