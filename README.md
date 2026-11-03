# Vivek Mishra — Portfolio

Personal portfolio built with the MEAN stack: an Angular 21 frontend (prerendered, CSS animations)
and an Express + MongoDB backend for the contact form.

```
vivek-portfolio/
├── src/              Angular app (sections live in src/app/<section>/)
├── public/assets/    Profile photo and resume PDF
├── backend/          Express API for the contact form (POST /api/contact)
├── vercel.json       Frontend hosting config (Vercel)
├── render.yaml       Backend hosting config (Render)
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

The site goes on **Vercel** and the contact API on **Render**. Both have free plans and deploy automatically
every time you push to GitHub.

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

### 2. Backend on Render

1. Sign in at https://render.com with GitHub.
2. **New → Blueprint**, pick the repository. Render reads `render.yaml` and creates `vivek-portfolio-api`.
3. Fill in the environment variables it asks for:
   - `FRONTEND_URL` — your Vercel URL (you can set it after step 3)
   - `MONGODB_URI` — *optional*, free cluster from https://www.mongodb.com/cloud/atlas
   - `SMTP_USER` / `SMTP_PASS` — *optional*, a Gmail address and a Gmail **App Password** so each message is emailed to you
4. When it's live, open `https://<your-service>.onrender.com/api/health` and you should see `{"status":"ok"}`.

If Render gives the service a different URL than `vivek-portfolio-api.onrender.com`, update the
`destination` in `vercel.json` to match and push again.

> Free Render services sleep after 15 minutes without traffic, so the first contact-form message after
> a quiet period can take up to a minute. Later ones are instant.

### 3. Frontend on Vercel

1. Sign in at https://vercel.com with GitHub.
2. **Add New → Project**, import the repository and click **Deploy**. `vercel.json` already sets the
   build command and output folder, so leave the other settings as they are.
3. Your site is live at `https://<project>.vercel.app`. Calls to `/api/*` are forwarded to Render.

**Custom domain (optional):** Vercel → Project → Settings → Domains.

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Dev server on http://localhost:4200 |
| `npm run build` | Production build into `dist/vivek-portfolio/` |
| `npm run serve:ssr:vivek-portfolio` | Serve the production build locally with Node on http://localhost:4000 |
