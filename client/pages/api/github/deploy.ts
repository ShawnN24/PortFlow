import { Octokit } from '@octokit/rest';
import { Base64 } from 'js-base64';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });

  const { html, formData, githubData, repoName, accessToken } = req.body;
  // Check for access token
  if (!accessToken) {
    return res.status(401).json({ message: 'Missing GitHub access token' });
  }
  // Encode the HTML content
  const contentEncoded = Base64.encode(html);

  const octokit = new Octokit({ auth: accessToken });
  const username = githubData.user.login;

  if (!username) {
    return res.status(400).json({ message: 'GitHub username is missing or invalid' });
  }
  console.log('Deploying to:', { owner: username, repo: repoName });

  try {
    // Try to create repo (ignore if it already exists)
    try {
      await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        private: false,
        auto_init: true,
      });
    } catch (e) {
      if (e.status === 422 && e.message.includes('name already exists')) {
        console.log('Repo already exists, continuing...');
      } else {
        throw new Error(`Failed to create repository: ${e.message}`);
      }
    }

    // Overwrite index.html
    const filePath = 'index.html';
    let sha;

    try {
      const { data } = await octokit.repos.getContent({
        owner: username,
        repo: repoName,
        path: filePath,
      });

      if (!Array.isArray(data)) sha = data.sha;
    } catch (err) {
      if (err.status !== 404) throw err;
    }

    await octokit.repos.createOrUpdateFileContents({
      owner: username,
      repo: repoName,
      path: filePath,
      message: 'Deploy index.html',
      content: contentEncoded,
      ...(sha ? { sha } : {}),
    });

    // Enable GitHub Pages (create site)
    try {
      await octokit.request('POST /repos/{owner}/{repo}/pages', {
        owner: username,
        repo: repoName,
        source: {
          branch: 'main',
          path: '/',
        },
      });
    } catch (err) {
      if (err.status === 409) {
        // Pages already enabled, ignore error
        console.log('GitHub Pages already enabled for this repo.');
      } else {
        throw err;
      }
    }

    const siteUrl = `https://${username}.github.io/${repoName}`;
    res.status(200).json({ message: `✅ Portfolio deployed successfully! View at ${siteUrl}`, url: siteUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Error deploying: ${err.message}` });
  }
}