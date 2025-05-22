import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  try {
    const response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: authHeader,
      },
    });
    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error("GitHub user data fetch error:", error);
    res.status(500).json({ error: 'Failed to fetch GitHub user data' });
  }
}