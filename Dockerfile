# Use the official Node.js image as the base
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code into the container
COPY src/ ./src

# If you have other necessary files (e.g., app.js, tsconfig.json), copy them as well
COPY tsconfig.json ./
# COPY jest.config.json ./

# Build the application (if using TypeScript)
RUN npm run build

# Expose the desired port
EXPOSE 3000


CMD ["npm", "start"]
