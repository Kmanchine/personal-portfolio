# Personal portfolio

Next.js (App Router) + MDX file-based content.

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production; merges here trigger deploy (self-hosted runner) |
| `dev` | Day-to-day work; merge into `main` when ready to release |

```bash
git checkout dev
# … edits …
git push origin dev
# open PR dev → main, or merge locally and push main
```

## Content

- CV / home: `content/profile.ts`
- Projects: `content/projects/*.mdx` (YAML frontmatter + MDX body)

## Scripts

```bash
npm run dev
npm run build
npm start
```

## Deploy

GitHub Actions workflow `.github/workflows/deploy.yml` runs on push to `main` on a **self-hosted** runner. Adjust build/deploy steps for your server (PM2, Docker, etc.).
