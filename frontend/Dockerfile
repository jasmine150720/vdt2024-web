FROM node:18.2.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the entire application code to the container
COPY . .

# Copy package.json and package-lock.json files separately to utilize layer caching
COPY package.json package-lock.json ./

# Install dependencies using npm ci for faster and more reliable builds
RUN npm ci

# Build the application
RUN npm run build

# Specify the default command to run the application
CMD ["npm", "start"]