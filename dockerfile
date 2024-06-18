FROM node:20-alpine as dev

WORKDIR /src

COPY package*.json /

COPY . .

RUN npm install
# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
