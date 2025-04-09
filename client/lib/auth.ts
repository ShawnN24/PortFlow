import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';

import appCredentials from './app-credentials';

import { createOAuthUserAuth } from "@octokit/auth-oauth-app";
import { NextRequest, NextResponse } from 'next/server';

export function loginWithGithub() {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID;
  const redirectUri = 'http://localhost:3000/';

  const authUrl = new URL(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`);

  window.location.assign(authUrl);
}


// https://github.com/login/oauth/authorize?client_id=Iv23licSQ1hCSRCNhMzO&redirect_uri=http://localhost:3000/
export async function githubAuth() {

  // loginWithGithub();

  // Instantiate new Octokit client
  const appOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: parseInt(process.env.GITHUB_APP_ID!, 10),
      privateKey: Buffer.from(process.env.GITHUB_APP_PRIVATE_KEY!, 'base64').toString(),
      clientId: (process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID!).toString(),
      clientSecret: (process.env.GITHUB_APP_CLIENT_SECRET!).toString(),
    }
  });

  // Send requests as GitHub App
  const slug = await appOctokit.request("GET /app");
  console.log("authenticated as %s", slug);

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