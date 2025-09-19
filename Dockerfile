FROM node:alpine

# Seting working directory 
WORKDIR /app

# Copying json files
COPY package.json package-lock.json ./

# Installing dependencies
RUN npm install

# Copying application code
COPY . .

# Port of node.js app
EXPOSE 3000

# Command to run application
CMD ["npm", "start"] 