export default async function createRepo(req, res) {
  const { token, repoName } = req.body;

  const response = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      name: repoName,
      private: false,
      description: 'Portfolio generated by PortFlow',
      auto_init: true,
    }),
  });

  const data = await response.json();

  if (response.status === 201) {
    res.status(200).json(data);
  } else {
    res.status(response.status).json(data);
  }
}