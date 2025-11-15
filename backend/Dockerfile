# Use Node.js as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the backend source code
COPY . .

# Expose port your server runs on
EXPOSE 5000

# Start command
CMD ["node", "server.js"]
