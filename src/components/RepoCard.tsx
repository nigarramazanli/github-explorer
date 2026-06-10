import React from 'react';
import { GitHubRepo } from '../types/github';

interface RepoCardProps {
  repo: GitHubRepo;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  PHP: '#4F5D95',
  Shell: '#89e051',
};

export function RepoCard({ repo }: RepoCardProps) {
  const color = repo.language ? (LANG_COLORS[repo.language] ?? '#8b949e') : '#8b949e';
  const updatedAt = new Date(repo.updated_at).toLocaleDateString('az-AZ', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="block bg-[#161b22] border border-[#30363d] rounded-lg p-4 hover:border-[#388bfd] transition-colors group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <svg className="shrink-0 text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" />
          </svg>
          <span className="font-mono text-sm font-semibold text-[#58a6ff] group-hover:underline truncate">
            {repo.name}
          </span>
        </div>
        {repo.fork && (
          <span className="text-[10px] border border-[#30363d] rounded-full px-2 py-0.5 text-slate-400 shrink-0">fork</span>
        )}
      </div>

      {repo.description && (
        <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">{repo.description}</p>
      )}

      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {repo.topics.slice(0, 4).map(topic => (
            <span key={topic} className="text-[10px] bg-[#1f6feb]/20 text-[#58a6ff] rounded-full px-2 py-0.5">
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            {repo.stargazers_count.toLocaleString()}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
            {repo.forks_count}
          </span>
        )}
        <span className="ml-auto">{updatedAt}</span>
      </div>
    </a>
  );
}
