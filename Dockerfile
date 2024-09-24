# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all project files into the container
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Run the app using npm
CMD ["npm", "run", "start"]
