# Unique Dental & Implant Centre — Complete Hosting & Deployment Guide

This guide covers everything required to deploy the **Unique Dental & Implant Centre** full-stack application to production.

---

## 📁 Project Architecture & Structure

```
Unique-Dental/
│
├── frontend/                          # React 19 + Vite Frontend
│   ├── public/                        # Static assets, branch/doctor photos, favicon
│   │   ├── branches/
│   │   ├── doctors/
│   │   ├── patients/
│   │   ├── services/
│   │   ├── _redirects                 # Netlify & Cloudflare SPA routing rewrite
│   │   └── favicon.svg
│   ├── src/                           # Components, Contexts, Pages, Hooks
│   │   ├── components/                # Layout & UI components (Navbar, Footer, etc.)
│   │   ├── context/                   # AuthContext, BookingContext, LanguageContext
│   │   ├── data/                      # Branches, dentists & clinic data
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── lib/api.js                 # Axios API client configured with JWT interceptor
│   │   └── pages/
│   │       ├── admin/                 # Admin Dashboard, Appointments, Patients, Gallery
│   │       ├── auth/                  # Login, Register
│   │       ├── patient/               # Patient Portal, Book Appointment, Medical Records
│   │       └── public/                # Home, About, Services, Gallery, Contact, Branches
│   ├── .env.example                   # Frontend environment template
│   ├── Dockerfile                     # Multi-stage production build (Node + Nginx)
│   ├── nginx.conf                     # Nginx SPA fallback configuration
│   ├── vercel.json                    # Vercel SPA routing rewrite
│   └── package.json
│
├── backend/                           # Node.js + Express + MongoDB REST API
│   ├── src/
│   │   ├── config/                    # Database, Cloudinary, Email, Swagger
│   │   ├── controllers/               # Auth, Appointment, Patient, Gallery, Medical Record
│   │   ├── middleware/                # JWT Auth, Upload, Rate Limiting, Error Handling
│   │   ├── models/                    # MongoDB Mongoose schemas (User, Appointment, etc.)
│   │   ├── routes/                    # Express REST endpoints (/api/v1/...)
│   │   ├── services/                  # Nodemailer email notification service
│   │   ├── utils/                     # Logger (Winston), API response formatters
│   │   ├── validators/                # Input validation rules
│   │   ├── app.js                     # Express app setup (CORS, Helmet, RateLimiter)
│   │   ├── server.js                  # HTTP server entry point with graceful shutdown
│   │   ├── seedAdmin.js               # Admin account seeder
│   │   └── seedGallery.js             # Initial clinic photo seeder
│   ├── logs/                          # Server & error logs (Winston)
│   ├── uploads/                       # Fallback local image uploads
│   ├── .env.example                   # Backend environment template
│   ├── Dockerfile                     # Production Node.js container
│   └── package.json
│
├── docker-compose.yml                 # One-command full-stack container orchestration
├── render.yaml                        # One-click Render Blueprint specification
├── package.json                       # Monorepo root scripts (dev, build, seed)
└── .gitignore                         # Comprehensive ignore rules
```

---

## Option 1: Recommended Free Tier (Vercel + Render + MongoDB Atlas)

### Step 1: Set up Cloud Database (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and register a free account.
2. Create a free **M0 cluster** (choose your closest AWS/GCP region, e.g., Mumbai / Singapore).
3. Under **Database Access**, create a database user (e.g. `dental_admin` + a strong password).
4. Under **Network Access**, add IP `0.0.0.0/0` (Allow access from anywhere).
5. Click **Connect** → **Drivers** → Copy your connection string:
   ```env
   mongodb+srv://dental_admin:<password>@cluster0.mongodb.net/dental_booking?retryWrites=true&w=majority
   ```

---

### Step 2: Deploy Backend to Render (Free Web Service)
1. Push your repository to **GitHub**.
2. Go to [Render.com](https://render.com) and create a free account.
3. Click **New +** → **Web Service** → Select your repository.
4. Set the following configuration:
   - **Name**: `unique-dental-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   ```env
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://dental_admin:<password>@cluster0.mongodb.net/dental_booking?retryWrites=true&w=majority
   JWT_SECRET=generate_a_long_random_string_here_32_chars
   CLIENT_URL=https://your-frontend-app.vercel.app,http://localhost:5173
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   EMAIL_FROM="Unique Dental <your_email@gmail.com>"
   ADMIN_EMAIL=your_email@gmail.com
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```
6. Click **Deploy Web Service**.
7. Once deployed, note your backend URL (e.g., `https://unique-dental-backend.onrender.com`).
8. You can verify health anytime at:
   `https://unique-dental-backend.onrender.com/health`

---

### Step 3: Deploy Frontend to Vercel (Free)
1. Go to [Vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New...** → **Project** → Select your GitHub repository.
3. Configure the project:
   - **Root Directory**: Click *Edit* and select `frontend`.
   - **Framework Preset**: `Vite` (auto-detected).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:
   ```env
   VITE_API_URL=https://unique-dental-backend.onrender.com/api/v1
   VITE_APP_NAME=Unique Dental & Implant Center
   VITE_APP_URL=https://your-frontend-app.vercel.app
   VITE_CLINIC_PHONE=+977-9800000000
   VITE_CLINIC_EMAIL=info@uniquedentalcenter.com
   VITE_WHATSAPP_NUMBER=9800000000
   ```
5. Click **Deploy**.
6. When Vercel finishes, copy your live frontend URL and update `CLIENT_URL` in your Render backend settings so CORS allows requests.

---

### Step 4: Seed Initial Admin User
In your Render backend dashboard:
1. Go to the **Shell** tab (or connect locally with your production `MONGO_URI` in `.env`).
2. Run:
   ```bash
   npm run seed:admin
   ```
3. Default admin credentials created:
   - **Email**: `uniquedental200@gmail.com`
   - **Password**: `unique123`
   *(Log in at `https://your-frontend.vercel.app/login` and change your password immediately).*

---

## Option 2: Docker Compose (Single VPS / Cloud Server)

If hosting on DigitalOcean, AWS EC2, Linode, or Hetzner:

```bash
# 1. Clone repository
git clone <your-repo-url>
cd Unique-Dental

# 2. Configure environment variables in backend/.env
cp backend/.env.example backend/.env
nano backend/.env

# 3. Start entire stack in detached mode
docker compose up -d --build

# 4. View logs
docker compose logs -f
```

---

## Option 3: Traditional VPS (Ubuntu + PM2 + Nginx)

1. **Install Node.js 20 & PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs nginx certbot python3-certbot-nginx
   sudo npm install -g pm2
   ```

2. **Deploy Backend**:
   ```bash
   cd /var/www/unique-dental/backend
   npm ci --omit=dev
   pm2 start src/server.js --name dental-backend --env production
   pm2 save
   pm2 startup
   ```

3. **Build Frontend**:
   ```bash
   cd /var/www/unique-dental/frontend
   npm ci
   npm run build
   ```

4. **Nginx Configuration** (`/etc/nginx/sites-available/dental`):
   ```nginx
   server {
       listen 80;
       server_name clinic.com www.clinic.com;

       # Frontend SPA
       location / {
           root /var/www/unique-dental/frontend/dist;
           index index.html;
           try_files $uri $uri/ /index.html;
       }

       # Backend API reverse proxy
       location /api/ {
           proxy_pass http://127.0.0.1:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
5. **Enable HTTPS**:
   ```bash
   sudo certbot --nginx -d clinic.com -d www.clinic.com
   ```
