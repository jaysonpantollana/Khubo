# Khubo Docker Setup

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows / Mac / Linux)
- Git

## Quick Start

```bash
# 1. Clone the repo and enter the directory
cd Khubo

# 2. Create your .env from the example
cp .env.example .env
#    Edit .env and paste your MapTiler API key:
#    VITE_MAPTILER_API_KEY=your_key_here

# 3. Build and start the container
docker compose up -d

# 4. Open the app
#    → http://localhost:8080
```

## Useful Commands

| Action | Command |
|---|---|
| **Build & start** | `docker compose up -d` |
| **Stop (keep data)** | `docker compose stop` |
| **Stop & remove** | `docker compose down` |
| **View logs** | `docker compose logs -f` |
| **Rebuild after code changes** | `docker compose up -d --build` |
| **Shell into container** | `docker compose exec app sh` |
| **Verify health** | `docker compose ps` |

## Common Mistakes & How This Setup Prevents Crashes

| Mistake | Prevention |
|---|---|
| **Missing `.env` file** | `docker compose up` fails fast with a clear error; `.env.example` documents every var |
| **Node modules mismatch** | `npm ci` inside the builder runs against a locked `package-lock.json` — exact versions guaranteed |
| **Port conflict (e.g. port 80 in use)** | Container maps to `8080:80` — change the left side to any free port |
| **SPA 404 on page refresh** | Nginx `try_files $uri $uri/ /index.html` rewrites all routes to `index.html` |
| **OS path issues** | Docker normalises paths — works identically on Windows, Mac, Linux |
| **Memory / disk fill-up** | Log driver limits to 3×10 MB files; no anonymous volumes leak data |
| **Crash on VPS boot** | `restart: unless-stopped` auto-recovers after host restart |
| **Stale cache after deploy** | `docker compose up -d --build` always rebuilds from fresh `npm ci` |
| **MapTiler API key leaked to git** | `.gitignore` ignores `.env`; `.dockerignore` keeps it out of the image |
