require('dotenv').config();
const path    = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { defaultLimiter } = require('./middleware/rateLimiter');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Enable trust proxy for cloud hosting & reverse proxies (Render, Railway, Heroku, Nginx)
app.set('trust proxy', 1);

// ─── Health Checks (Root & Cloud Probes) ───────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Dental Booking API is healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Unique Dental & Implant Centre API',
    status: 'running',
    docs: '/api/docs',
    health: '/health',
  });
});

// ─── Security & Parsing ───────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// Serve uploaded gallery images as static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// CORS configuration supporting single origin, comma-separated list, or wildcard
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim())
  : '*';

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins === '*' || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// ─── Request Logging ──────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(
    morgan('combined', {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  );
}

// ─── Rate Limiting ────────────────────────────────────────────────────────────
app.use('/api', defaultLimiter);

// ─── API Documentation ────────────────────────────────────────────────────────
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Dental Booking API',
    customCss: '.swagger-ui .topbar { display: none }',
  })
);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/v1', require('./routes/index'));

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
