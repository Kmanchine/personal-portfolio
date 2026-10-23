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

GitHub Actions workflow `.github/workflows/deploy.yml` runs on push to `main` on a **self-hosted** runner. The workflow builds a Docker image and runs it on host port **8007**.

Set these environment variables on the server (or in GitHub Actions secrets passed into `docker run -e …`) for the contact form:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | [Resend](https://resend.com) API key |
| `CONTACT_TO_EMAIL` | Inbox that receives messages |
| `CONTACT_FROM_EMAIL` | Verified Resend sender address |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (public) |
| `TURNSTILE_SECRET_KEY` | Turnstile secret for server verification |

Copy `.env.example` for local development. Turnstile widgets require a site key even in dev; use Cloudflare’s test keys for localhost if needed.

## Design

Newspaper-style layout: anonymous front page (skills, about, experience), paginated project spreads, animated envelope contact with Turnstile + Resend.
