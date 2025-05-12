# Use a lightweight official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the package files first (to cache dependencies)
COPY package*.json ./

# Install dependencies (this step will be cached if package.json hasn't changed)
RUN npm install

# Copy the rest of your project files
COPY . .

# Build the project (this catches case-sensitive errors)
RUN npm run build
