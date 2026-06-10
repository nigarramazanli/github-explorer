import { useQuery } from '@tanstack/react-query';
import { fetchUser, fetchRepos } from '../api/github';

export function useGitHubUser(username: string) {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => fetchUser(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // 5 dəqiqə cache
    retry: 1,
  });
}

export function useGitHubRepos(username: string) {
  return useQuery({
    queryKey: ['repos', username],
    queryFn: () => fetchRepos(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
