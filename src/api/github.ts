import { GitHubUser, GitHubRepo } from '../types/github';

const BASE_URL = 'https://api.github.com';

const headers = {
  Accept: 'application/vnd.github.v3+json',
};

export async function fetchUser(username: string): Promise<GitHubUser> {
  const res = await fetch(`${BASE_URL}/users/${username}`, { headers });
  if (!res.ok) {
    if (res.status === 404) throw new Error('İstifadəçi tapılmadı');
    if (res.status === 403) throw new Error('API limit aşıldı. Bir az gözləyin.');
    throw new Error('Xəta baş verdi');
  }
  return res.json();
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${BASE_URL}/users/${username}/repos?per_page=100&sort=updated`,
    { headers }
  );
  if (!res.ok) throw new Error('Repolar yüklənmədi');
  return res.json();
}
