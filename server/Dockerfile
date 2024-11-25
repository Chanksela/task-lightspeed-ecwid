FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY . .

# Expose the port your server runs on (change if necessary)
EXPOSE 5000

# Command to start the server
CMD ["npm", "run", "start"]
