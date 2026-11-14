# Unique Dental & Implant Centre

A modern, production-grade full-stack web application and clinic management system built with React 19, Vite, Tailwind CSS, Node.js, Express, and MongoDB.

---

## 🏥 Features

- **Public Clinic Portal**: Service showcase, interactive Google Maps location pinpoints, branch details, doctor team directory, clinic gallery, and patient testimonials.
- **Appointment Booking System**: Automated booking workflow with doctor availability, service categories, and real-time status management.
- **Admin Control Centre**: Comprehensive administrative dashboard for managing appointments, patient records, clinic statistics, and gallery assets.
- **Cloudinary CDN Integration**: Dual-mode asset management (automatic Cloudinary upload with local disk fallback).
- **Automated Email Notifications**: Transactional emails powered by Nodemailer for booking confirmations, status changes, and administrator alerts.
- **Role-Based Security**: Secure JWT authentication, bcrypt password hashing, input validation, and rate limiting.

---

## 📁 Repository Structure

```
Unique-Dental/
│
├── frontend/                  # React 19 + Vite + Tailwind CSS client
│   ├── public/                # Static brand & team assets
│   ├── src/                   # Components, Contexts, Pages, Hooks
│   ├── vercel.json            # Vercel SPA routing
│   ├── nginx.conf             # Nginx reverse proxy configuration
│   └── Dockerfile             # Multi-stage production container
│
├── backend/                   # Node.js + Express REST API
│   ├── src/                   # Routes, Controllers, Models, Services
│   ├── Dockerfile             # Node.js 20 production container
│   └── package.json           # Backend dependencies and scripts
│
├── docker-compose.yml         # Container orchestration (Frontend + Backend + Mongo)
├── render.yaml                # One-click Render Blueprint specification
├── HOSTING_GUIDE.md           # Step-by-step deployment guide
└── package.json               # Root monorepo orchestration scripts
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js** >= 18.0.0
- **MongoDB** running locally on port 27017 or a MongoDB Atlas URI

### 2. Installation
Install all dependencies for both frontend and backend from the root:
```bash
npm run install:all
```

### 3. Environment Configuration
Copy `.env.example` templates in both `backend` and `frontend`:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```
Update your credentials (MongoDB URI, JWT Secret, Cloudinary keys, Email settings).

### 4. Seed Admin Account
Seed the initial administrator account:
```bash
npm run seed:admin
```
- **Email**: `uniquedental200@gmail.com`
- **Password**: `unique123`

### 5. Run the Application
In separate terminal windows (or concurrently):
```bash
# Start Backend API (http://localhost:5000)
npm run dev:backend

# Start Frontend (http://localhost:5173)
npm run dev:frontend
```

---

## 🌐 Production Deployment

Refer to [`HOSTING_GUIDE.md`](./HOSTING_GUIDE.md) for full deployment instructions across **Vercel**, **Render**, **Docker**, and **Linux VPS**.

---

## 📄 License
This project is licensed under the MIT License.
