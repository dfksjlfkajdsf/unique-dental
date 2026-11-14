const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dental Booking System API',
      version: '1.0.0',
      description: 'REST API for Dental Clinic Appointment Management',
      contact: { name: 'API Support', email: 'support@dentalclinic.com' },
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 5000}/api/v1`, description: 'Development' },
      { url: 'https://your-production-url.com/api/v1', description: 'Production' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

module.exports = swaggerJsdoc(options);
