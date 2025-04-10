

export default async function handleGithubAuth(user: string) {
  const res = await fetch(`https://api.github.com/users/${user}/repos`);
  const data = await res.json();
  return data;
}