import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SearchBar } from './components/SearchBar';
import { UserProfile } from './components/UserProfile';
import { RepoList } from './components/RepoList';
import { useGitHubUser, useGitHubRepos } from './hooks/useGitHub';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function GitHubExplorer() {
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState<'repos' | 'gists'>('repos');

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
    isFetching,
  } = useGitHubUser(username);

  const {
    data: repos = [],
    isLoading: reposLoading,
  } = useGitHubRepos(username);

  const isLoading = userLoading || isFetching;

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans text-[#e6edf3]">
      {/* Header */}
      <header className="border-b border-[#30363d] bg-[#161b22]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <svg height="28" viewBox="0 0 16 16" fill="#e6edf3" aria-hidden="true">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
            </svg>
            <span className="font-mono text-sm font-semibold text-[#e6edf3]">GitHub Explorer</span>
          </div>
          <SearchBar onSearch={setUsername} isLoading={isLoading} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Empty state */}
        {!username && (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#161b22] border border-[#30363d] mb-4">
              <svg height="32" viewBox="0 0 16 16" fill="#8b949e">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-300 mb-2">GitHub istifadəçisini axtarın</h2>
            <p className="text-sm text-slate-500">İstifadəçi adını daxil edib profil və repolarına baxın</p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['torvalds', 'gaearon', 'sindresorhus', 'tj'].map(u => (
                <button
                  key={u}
                  onClick={() => setUsername(u)}
                  className="font-mono text-xs px-3 py-1.5 rounded-full bg-[#161b22] border border-[#30363d] text-[#58a6ff] hover:border-[#388bfd] transition-colors"
                >
                  @{u}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading state */}
        {username && isLoading && (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-[#388bfd] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-slate-400 font-mono">Yüklənir...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {userError && !isLoading && (
          <div className="bg-[#161b22] border border-red-800 rounded-xl p-6 text-center">
            <p className="text-red-400 text-sm">{(userError as Error).message}</p>
          </div>
        )}

        {/* Content */}
        {user && !isLoading && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-64 shrink-0">
              <UserProfile user={user} />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Tabs */}
              <div className="flex gap-1 mb-5 border-b border-[#30363d]">
                <button
                  onClick={() => setActiveTab('repos')}
                  className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === 'repos'
                      ? 'border-[#f78166] text-[#e6edf3]'
                      : 'border-transparent text-slate-400 hover:text-[#e6edf3]'
                  }`}
                >
                  Repolar
                  <span className="ml-1.5 text-xs bg-[#30363d] rounded-full px-1.5 py-0.5">{repos.length}</span>
                </button>
              </div>

              {reposLoading ? (
                <div className="flex justify-center py-12">
                  <div className="w-6 h-6 border-2 border-[#388bfd] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <RepoList repos={repos} />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GitHubExplorer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
