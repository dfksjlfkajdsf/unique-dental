# Unique Dental & Implant Center — Frontend

React + Vite + Tailwind CSS frontend for Unique Dental & Implant Center.

---

## 🚀 Getting Started (Local Dev)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Then open .env and fill in your real values

# 3. Start dev server
npm run dev
```

---

## ⚙️ Environment Variables

All sensitive config lives in `.env` (never committed to git).  
Copy `.env.example` → `.env` and fill in:

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL (e.g. `https://api.yourdomain.com/api/v1`) |
| `VITE_APP_NAME` | Site name shown in the UI |
| `VITE_APP_URL` | Public URL of the deployed site |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps Embed API key |
| `VITE_CLINIC_PHONE` | Clinic phone number |
| `VITE_CLINIC_EMAIL` | Clinic contact email |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number (digits only, with country code) |
| `VITE_FACEBOOK_URL` | Facebook page URL |
| `VITE_INSTAGRAM_URL` | Instagram page URL |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics Measurement ID (e.g. `G-XXXXXXXX`) |

> **Note:** Only variables prefixed with `VITE_` are exposed to the browser bundle.

---

## 🏗️ Build for Production

```bash
npm run build
```

Output is placed in `dist/`. Deploy this folder to any static host.

---

## 🌐 Deployment Options

### Vercel (Recommended)
1. Push the repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Set all `VITE_*` variables in **Project Settings → Environment Variables**.
4. Vercel auto-runs `npm run build` and serves `dist/`.

### Netlify
1. Push the repo to GitHub.
2. Connect at [app.netlify.com](https://app.netlify.com).
3. Build command: `npm run build` — Publish directory: `dist`.
4. Add env vars under **Site Settings → Environment Variables**.
5. Add a `public/_redirects` file for SPA routing:
   ```
   /* /index.html 200
   ```

### cPanel / Shared Hosting
1. Run `npm run build` locally.
2. Upload the contents of `dist/` to `public_html/`.
3. Add an `.htaccess` for SPA routing:
   ```apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QSA,L]
   ```

---

## 🗂️ Project Structure

```
dental-frontend/
├── public/
│   └── doctors/          # Doctor photos (static assets)
├── src/
│   ├── components/       # Shared UI components
│   ├── context/          # React contexts (Auth, Language, Booking)
│   ├── data/             # Static data (branches, dentists, services)
│   ├── lib/              # API client (axios)
│   └── pages/
│       ├── public/       # Public-facing pages
│       └── dashboard/    # Admin dashboard pages
├── .env                  # Local env vars (git-ignored)
├── .env.example          # Template — safe to commit
└── vite.config.js
```

---

## 🔒 Security Checklist Before Going Live

- [ ] `.env` is in `.gitignore` ✅
- [ ] No API keys hardcoded in `src/` — use `import.meta.env.VITE_*`
- [ ] Production `VITE_API_URL` points to your live backend
- [ ] HTTPS enabled on your domain
- [ ] Backend CORS configured to allow only your frontend domain
