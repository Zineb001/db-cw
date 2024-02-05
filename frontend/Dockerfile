# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Build the app
RUN npm run build

# Install serve and serve the production build
RUN npm install -g serve
CMD ["serve", "-s", "build"]
