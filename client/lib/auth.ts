import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';

import appCredentials from './app-credentials';

import { createOAuthUserAuth } from "@octokit/auth-oauth-app";
import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const clientId = process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID;
const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/';

function loginWithGithub(state: string) {
  const authUrl = new URL(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`);

  window.location.assign(authUrl);

  console.log(`AUTHURL:${authUrl}`);
}

async function exchangeCodeWithToken(code: string) {
  // console.log("EXCHANGECODEWITHTOKEN");
  // try {
  //   const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       clientId,
  //       clientSecret,
  //       code,
  //       redirectUri,
  //     }),
  //   });

  //   const data = await tokenRes.json();
  //   console.log(`DATA:${data}`);
  // } catch(e) {
  //   console.error(e);
  // }
}


// https://github.com/login/oauth/authorize?client_id=Iv23licSQ1hCSRCNhMzO&redirect_uri=http://localhost:3000/
export async function githubAuth() {
  const [isCode, setCode] = useState<string | null>();
  const [isState, setState] = useState<string | null>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setCode(urlParams.get("code"));
    setState(urlParams.get("state"));
  }, []);

  // Create random id to ensure security
  const state = crypto.randomUUID();

  loginWithGithub(state);

  if(isCode && isState == state) exchangeCodeWithToken(isCode);

  // Instantiate new Octokit client
  // const appOctokit = new Octokit({
  //   authStrategy: createAppAuth,
  //   auth: {
  //     appId: parseInt(process.env.GITHUB_APP_ID!, 10),
  //     privateKey: Buffer.from(process.env.GITHUB_APP_PRIVATE_KEY!, 'base64').toString(),
  //     clientId: (process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID!).toString(),
  //     clientSecret: (process.env.GITHUB_APP_CLIENT_SECRET!).toString(),
  //   }
  // });

  // // Send requests as GitHub App
  // const slug = await appOctokit.request("GET /app");
  // console.log("authenticated as %s", slug);

  // // create a new octokit instance that is authenticated as the user
  // const userOctokit = await appOctokit.auth({
  //   type: "oauth-user",
  //   code: "code123",
  //   factory: (options) => {
  //     return new Octokit({
  //       authStrategy: createOAuthUserAuth,
  //       auth: options,
  //     });
  //   },
  // });

  // const {
  //   data: { login },
  // } = await userOctokit.request("GET /user");
  // console.log("Hello, %s!", login);
}