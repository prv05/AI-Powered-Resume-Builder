# Use Node.js base image
FROM node:18

# Set working directory inside container
WORKDIR /backend

# Copy package.json & install dependencies (if needed for root-level deps)
COPY package.json .

# Copy backend folder contents into the container
COPY . .

# Install backend dependencies
RUN npm install

# Expose the port your app uses
EXPOSE 3000

# Start the app from inside /backend where server.js now exists
CMD ["node", "server.js"]
