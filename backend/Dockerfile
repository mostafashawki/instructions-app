# Lightweight Node.js 16.14.0
# see https://github.com/nodejs/docker-node/blob/6f740b0ca772e978b44c11d194f369e554c54a14/16/alpine3.14/Dockerfile
FROM node:lts-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --save --legacy-peer-deps

COPY . .
