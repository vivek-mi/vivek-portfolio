# Vivek Mishra — Portfolio

Personal portfolio built with the MEAN stack: an Angular 21 frontend (prerendered, CSS animations)
and an Express + MongoDB backend for the contact form.

```
vivek-portfolio/
├── src/              Angular app (sections live in src/app/<section>/)
├── public/assets/    Profile photo and resume PDF
├── backend/          Express API for the contact form (POST /api/contact)
├── api/index.js      Runs the backend as a Vercel serverless function in production
├── vercel.json       Hosting config (Vercel: site + /api function)
└── proxy.conf.json   Sends /api calls to the local backend during development
```

## Run it locally (VS Code)

Requires **Node.js 20.19+ or 22+** (check with `node -v`).

1. Open this folder in VS Code (`File → Open Folder…`).
2. Open a terminal (`` Ctrl+` ``) and install dependencies:

   ```bash
   npm install
   ```

3. Start the site:

   ```bash
   npm start
   ```

   Open http://localhost:4200. Edits reload automatically.

4. *(Optional, for the contact form)* In a **second** terminal:

   ```bash
   cd backend
   npm install
   copy .env.example .env
   npm run dev
   ```

   The API runs on http://localhost:3000, and the Angular dev server forwards `/api` calls to it.
   Set at least one of these in `backend/.env`, otherwise the form refuses messages and asks visitors to email you:
   - `SMTP_USER` + `SMTP_PASS`: each message is emailed to you (Gmail **App Password**, see below)
   - `MONGODB_URI`: each message is saved in MongoDB (`contacts` collection, kept for 90 days)

### Common edits

| What | Where |
|---|---|
| Hero text, stats, tech badges | `src/app/hero/hero.html` |
| Job history | `src/app/experience/experience.html` |
| Work projects (cowork, StartWorks, Connect Bharat) | `src/app/work/` |
| Personal projects | `src/app/projects/projects.html` |
| Certificates | `src/app/certifications/` |
| Photo / resume | replace files in `public/assets/` (keep the same names) |
| Colours, fonts | CSS variables at the top of `src/styles.scss` |

## Deploy for free

Everything runs on **Vercel**'s free plan: the site is static files and the contact API runs as a serverless
function (`api/index.js`, which reuses the Express app in `backend/src/app.js`). Every push to GitHub redeploys.

### 1. Push to GitHub

Create an empty repository on GitHub (e.g. `vivek-portfolio`), then from this folder:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/vivek-mi/vivek-portfolio.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Sign in at https://vercel.com with GitHub.
2. **Add New → Project**, import the repository and click **Deploy**. `vercel.json` already sets the
   build command and output folder, so leave the other settings as they are.
3. Your site is live at `https://<project>.vercel.app`.

### 3. Turn on the contact form

Vercel → Project → **Settings → Environment Variables**, add at least one of these, then redeploy
(**Deployments → ⋯ → Redeploy**):

- `MONGODB_URI` — saves each message in MongoDB Atlas (free M0 cluster; allow access from `0.0.0.0/0`)
- `SMTP_USER` + `SMTP_PASS` — emails each message to you (Gmail address and a Gmail **App Password**)

Check it at `https://<project>.vercel.app/api/health`: it should show `"database":"connected"`.
Messages are in Atlas → **Data Explorer** → `portfolio` → `contacts` (kept for 90 days).

> Free Atlas clusters pause after a long time with no activity. If the form starts failing, resume the cluster in Atlas.

**Custom domain (optional):** Vercel → Project → Settings → Domains.

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Dev server on http://localhost:4200 |
| `npm run build` | Production build into `dist/vivek-portfolio/` |
| `npm run serve:ssr:vivek-portfolio` | Serve the production build locally with Node on http://localhost:4000 |
