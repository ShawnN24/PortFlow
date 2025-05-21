import dotenv from 'dotenv';
dotenv.config();

const config = {
  appId: parseInt(process.env.GITHUB_APP_ID!, 10),
  privateKey: Buffer.from(process.env.GITHUB_APP_PRIVATE_KEY!, 'base64').toString(),
  clientId: (process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID!).toString(),
  clientSecret: (process.env.GITHUB_APP_CLIENT_SECRET!).toString(),
};

export default config;