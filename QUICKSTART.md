# BenBettsDesign.com — Quick Start Guide

A reference for everything that had to be done manually to set this up, so it's easy to replicate or recover.

---

## What This Is

- **Site:** Next.js portfolio, deployed on Netlify → `benbettsdesign.netlify.app`
- **CMS:** Sanity Studio v5 → `benbettsdesign.sanity.studio`
- **Repo:** `github.com/seandb/benbettsdesign`
- **Sanity project ID:** `3ta2u9fb` · dataset: `production`

---

## Sanity Studio

### First-time login
```bash
cd studio
npx sanity login
```
Opens a browser. Log in with your Sanity account. Must be done interactively — can't be automated.

### Deploy the studio
```bash
cd studio
SANITY_AUTH_TOKEN="<your token>" npx sanity deploy --yes
```
Your auth token is stored at `~/.config/sanity/config.json`.
Studio URL: `https://benbettsdesign.sanity.studio`
App ID: `kjsizmpuamtd0vwwx9binpez`

### Upgrade Sanity (when prompted)
```bash
cd studio
npm install sanity@latest --legacy-peer-deps
npm install react@latest react-dom@latest --legacy-peer-deps
# Then redeploy
SANITY_AUTH_TOKEN="<your token>" npx sanity deploy --yes
```

### Add a new user (e.g. Ben)
1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select the project → **Members** → **Invite**
3. Enter their email address and set role to **Editor**

---

## Netlify

### Build settings (critical)
Go to **Site configuration → Build & deploy → Build settings → Configure**

| Setting | Value |
|---|---|
| Build command | `next build` |
| Publish directory | `.next` |
| Node version | `20` |

> The build command must be **only** `next build`. The old TinaCMS command (`npx tinacms build && next build`) will break the build.

### Auto-deploy webhook (Sanity → Netlify)

So the site rebuilds automatically when content is published in Sanity:

**Step 1 — Create a Netlify build hook:**
- Netlify → Site configuration → Build & deploy → **Build hooks** → Add build hook
- Name it `Sanity publish`, copy the URL

**Step 2 — Create a Sanity webhook:**
- [manage.sanity.io](https://manage.sanity.io) → your project → **API** → **Webhooks** → Create webhook
- URL: paste the Netlify build hook URL
- Trigger on: **Create**, **Update**, **Delete** (all three checked)
- Dataset: `production`
- Enable webhook: on

---

## Migrating Content

If you ever need to re-run the content migration (e.g. starting fresh):

```bash
# From the project root
SANITY_TOKEN="<your token>" node scripts/migrate-to-sanity.mjs
```

This uploads all images from the old benbettsdesign.com site and creates all 9 page documents in Sanity.

To re-run just the digital page patch (adds banner ad embeds):
```bash
SANITY_TOKEN="<your token>" node scripts/patch-digital.mjs
```

---

## Redeploying the Studio After Schema Changes

Any time you edit files in `studio/schemaTypes/`, you must redeploy the studio:

```bash
cd studio
SANITY_AUTH_TOKEN="<your token>" npx sanity deploy --yes
```

---

## Local Development

```bash
# Run the Next.js site
npm run dev        # → http://localhost:3000

# Run Sanity Studio locally
cd studio
npx sanity dev     # → http://localhost:3333
```

---

## Key URLs

| | URL |
|---|---|
| Live site | https://benbettsdesign.netlify.app |
| Sanity Studio | https://benbettsdesign.sanity.studio |
| Sanity project | https://manage.sanity.io |
| Netlify dashboard | https://app.netlify.com |
| GitHub repo | https://github.com/seandb/benbettsdesign |
