import React from 'react';
import { GitHubUser } from '../types/github';

interface UserProfileProps {
  user: GitHubUser;
}

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center p-3 rounded-lg bg-[#161b22] border border-[#30363d]">
    <span className="text-lg font-bold text-[#e6edf3] font-mono">{value.toLocaleString()}</span>
    <span className="text-xs text-slate-400 mt-0.5">{label}</span>
  </div>
);

export function UserProfile({ user }: UserProfileProps) {
  const joinYear = new Date(user.created_at).getFullYear();

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 w-full">
      <div className="flex items-start gap-5">
        <a href={user.html_url} target="_blank" rel="noreferrer">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-20 h-20 rounded-full ring-2 ring-[#30363d] hover:ring-[#388bfd] transition-all"
          />
        </a>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {user.name && (
              <h2 className="text-xl font-bold text-[#e6edf3]">{user.name}</h2>
            )}
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-[#58a6ff] hover:underline"
            >
              @{user.login}
            </a>
          </div>
          {user.bio && (
            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{user.bio}</p>
          )}
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-400">
            {user.company && (
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                {user.company}
              </span>
            )}
            {user.location && (
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {user.location}
              </span>
            )}
            {user.blog && (
              <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#58a6ff]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                {user.blog}
              </a>
            )}
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {joinYear}-dən bəri
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        <StatCard label="Repo" value={user.public_repos} />
        <StatCard label="Follower" value={user.followers} />
        <StatCard label="Following" value={user.following} />
      </div>
    </div>
  );
}
