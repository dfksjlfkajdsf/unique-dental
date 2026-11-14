FROM node:20-alpine

WORKDIR /app

# Install dependencies first for Docker caching
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Expose default port
EXPOSE 5000

# Start server
CMD ["node", "src/server.js"]
