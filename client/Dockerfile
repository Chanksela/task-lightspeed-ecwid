FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code
COPY . .

# Expose the port your client runs on (change if necessary)
EXPOSE 3000

# Command to start the client
CMD ["npm", "run", "dev"]
