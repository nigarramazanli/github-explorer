import React, { useState, useMemo } from 'react';
import { GitHubRepo } from '../types/github';
import { RepoCard } from './RepoCard';

interface RepoListProps {
  repos: GitHubRepo[];
}

type SortKey = 'updated' | 'stars' | 'forks' | 'name';

export function RepoList({ repos }: RepoListProps) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('updated');
  const [langFilter, setLangFilter] = useState('');
  const [showForks, setShowForks] = useState(false);

  const languages = useMemo(() => {
    const langs = repos
      .map(r => r.language)
      .filter((l): l is string => !!l);
    return Array.from(new Set(langs)).sort();
  }, [repos]);

  const filtered = useMemo(() => {
    let list = repos.filter(r => showForks || !r.fork);
    if (langFilter) list = list.filter(r => r.language === langFilter);
    if (search) list = list.filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
    );
    switch (sort) {
      case 'stars': return [...list].sort((a, b) => b.stargazers_count - a.stargazers_count);
      case 'forks': return [...list].sort((a, b) => b.forks_count - a.forks_count);
      case 'name':  return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:      return [...list].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }
  }, [repos, search, sort, langFilter, showForks]);

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Repo axtar..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[160px] px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-sm text-[#e6edf3] placeholder-slate-500 font-mono focus:outline-none focus:border-[#388bfd] transition-colors"
        />
        <select
          value={langFilter}
          onChange={e => setLangFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-sm text-[#e6edf3] focus:outline-none focus:border-[#388bfd] transition-colors"
        >
          <option value="">Bütün dillər</option>
          {languages.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortKey)}
          className="px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-sm text-[#e6edf3] focus:outline-none focus:border-[#388bfd] transition-colors"
        >
          <option value="updated">Son yenilənən</option>
          <option value="stars">Ulduzlara görə</option>
          <option value="forks">Fork-lara görə</option>
          <option value="name">Ada görə</option>
        </select>
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-sm text-slate-400 cursor-pointer hover:border-[#388bfd] transition-colors">
          <input type="checkbox" checked={showForks} onChange={e => setShowForks(e.target.checked)} className="accent-[#388bfd]" />
          Fork-ları göstər
        </label>
      </div>

      <p className="text-xs text-slate-500 mb-3 font-mono">{filtered.length} repo tapıldı</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          Heç bir repo tapılmadı
        </div>
      )}
    </div>
  );
}
