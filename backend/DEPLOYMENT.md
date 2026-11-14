# Dental Booking System — Deployment Guide

## Local Development

### 1. Prerequisites
- Node.js >= 18
- MongoDB >= 6 (local) or MongoDB Atlas URI

### 2. Setup
```bash
cd dental-booking-system
cp .env.example .env        # fill in your values
npm install
npm run dev                 # starts with nodemon on :5000
```

### 3. Create the first Admin user
After starting, register a user then manually set role in MongoDB:
```js
// mongo shell
use dental_booking
db.users.updateOne({ email: "admin@clinic.com" }, { $set: { role: "admin" } })
```

### 4. API entry points
| URL | Description |
|-----|-------------|
| `GET  /api/v1/health` | Health check |
| `GET  /api/docs`      | Swagger UI |

---

## Production Deployment (Ubuntu VPS)

### 1. Install dependencies
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

### 2. Clone & configure
```bash
git clone <repo-url> /opt/dental-api
cd /opt/dental-api
npm ci --omit=dev
cp .env.example .env
nano .env   # set production values
```

### 3. Start with PM2
```bash
pm2 start src/server.js --name dental-api --env production
pm2 save
pm2 startup   # follow the printed command to enable auto-restart on boot
```

### 4. Nginx reverse proxy
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. HTTPS with Certbot
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

---

## Docker Deployment

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
EXPOSE 5000
CMD ["node", "src/server.js"]
```

### docker-compose.yml
```yaml
version: '3.9'
services:
  api:
    build: .
    ports: ["5000:5000"]
    env_file: .env
    depends_on: [mongo]
    restart: unless-stopped

  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

volumes:
  mongo_data:
```

```bash
docker compose up -d
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default 5000) |
| `NODE_ENV` | Yes | `development` or `production` |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Long random string (32+ chars) |
| `JWT_EXPIRES_IN` | No | Token TTL (default `7d`) |
| `EMAIL_HOST` | Yes | SMTP host |
| `EMAIL_PORT` | Yes | SMTP port (587 for TLS) |
| `EMAIL_USER` | Yes | SMTP username |
| `EMAIL_PASS` | Yes | SMTP password / app password |
| `EMAIL_FROM` | Yes | From address |
| `RATE_LIMIT_WINDOW_MS` | No | Rate limit window ms (default 900000) |
| `RATE_LIMIT_MAX` | No | Max requests per window (default 100) |
| `CLIENT_URL` | No | Allowed CORS origin |

---

## MongoDB Atlas (Free Tier)

1. Create account at cloud.mongodb.com
2. Create a free M0 cluster
3. Add DB user and whitelist your IP
4. Copy the connection string to `MONGO_URI`

---

## Gmail App Password (for Nodemailer)

1. Enable 2FA on your Google account
2. Go to Google Account > Security > App passwords
3. Generate a password for "Mail"
4. Use it as `EMAIL_PASS`
