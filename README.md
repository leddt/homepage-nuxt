# Homepage

A simple [Nuxt](https://nuxt.com) app that I'm using as [my homepage](https://homepage.leddt.com).

## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack):

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

## Deploy

Deploy to [Cloudflare Workers](https://developers.cloudflare.com/workers/) with Wrangler:

```bash
pnpm deploy
```

Or build then deploy separately:

```bash
pnpm build
pnpm exec wrangler deploy
```

CI deploys on every push via GitHub Actions. Required repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
