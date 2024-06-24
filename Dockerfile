# Use the official Node.js image as a base
FROM node:18-alpine
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package*.json yarn.lock ./

# Install dependencies using Yarn
#RUN yarn install

#npm install
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port that the Next.js app runs on
EXPOSE 3000

# Build the Next.js app
RUN npm run build



# Start the Next.js app in production mode
CMD ["npm", "start"]
