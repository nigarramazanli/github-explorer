# 🐙 GitHub Explorer

GitHub istifadəçilərinin profil və repolarını araşdırmaq üçün React + TypeScript + Tailwind CSS + TanStack Query ilə yazılmış veb tətbiq.

## 🛠️ İstifadə edilən texnologiyalar

| Texnologiya | Versiya | İstifadə məqsədi |
|---|---|---|
| React | 18 | UI framework |
| TypeScript | 4.x | Tip təhlükəsizliyi |
| Tailwind CSS | 3.x | Stillər |
| TanStack Query | 5.x | Server state idarəetməsi, caching |

## ✨ Xüsusiyyətlər

- 🔍 **İstifadəçi axtarışı** — GitHub username ilə profil yükləmə
- 👤 **Profil görünüşü** — Avatar, bio, statistikalar (repo, follower, following)
- 📁 **Repo siyahısı** — Bütün public repolar
- 🔎 **Filtr & axtarış** — Repo adı/açıqlamasına görə axtarış
- 🌐 **Dil filteri** — Proqramlaşdırma dilinə görə filtrləmə
- 📊 **Sıralama** — Yenilənmə tarixi, ulduz, fork, ad
- ⚡ **TanStack Query caching** — 5 dəqiqə cache, təkrar sorğu yoxdur
- 🔄 **Loading & error state-lər** — Xəta mesajları Azərbaycanca

## 🚀 Başlamaq

```bash
# Asılılıqları quraşdır
npm install

# Development server-i işlət
npm start

# Production üçün build et
npm run build
```

## 📁 Layihə strukturu

```
src/
├── api/
│   └── github.ts          # GitHub REST API funksiyaları
├── components/
│   ├── SearchBar.tsx       # Axtarış komponenti
│   ├── UserProfile.tsx     # İstifadəçi profil kartı
│   ├── RepoCard.tsx        # Tək repo kartı
│   └── RepoList.tsx        # Repo siyahısı + filterlər
├── hooks/
│   └── useGitHub.ts        # TanStack Query hook-ları
├── types/
│   └── github.ts           # TypeScript interface-ləri
└── App.tsx                 # Əsas komponent + QueryClient
```

## 🏗️ Arxitektura qeydləri

### TanStack Query istifadəsi
```tsx
// useGitHub.ts — Data fetching hook-ları
const { data: user, isLoading, error } = useGitHubUser(username);
const { data: repos } = useGitHubRepos(username);
```

- `queryKey: ['user', username]` — Hər username üçün ayrı cache
- `enabled: !!username` — Username boş olduqda sorğu göndərilmir
- `staleTime: 5dk` — 5 dəqiqə ərzində eyni sorğu yenidən göndərilmir

### TypeScript type-ları
`GitHubUser` və `GitHubRepo` interface-ləri GitHub REST API v3-ün cavablarına uyğundur.
