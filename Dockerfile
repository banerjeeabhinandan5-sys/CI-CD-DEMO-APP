# Use a lightweight official Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first (better Docker layer caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the app's source code
COPY . .

# The app listens on this port
EXPOSE 3000

# Command to run when the container starts
CMD ["node", "index.js"]
