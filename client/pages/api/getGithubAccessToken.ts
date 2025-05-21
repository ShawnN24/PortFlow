import type { NextApiRequest, NextApiResponse } from 'next';

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid code query param' });
  }

  const params = `?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`;

  try {
    const response = await fetch(`https://github.com/login/oauth/access_token${params}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub access token' });
  }
}