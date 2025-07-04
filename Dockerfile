# Use an official Node.js 18.x image as the base
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

COPY package.json .

COPY . .

EXPOSE 3000

RUN npm install

RUN npm run build:development

CMD ["npm", "run", "start:development"]
