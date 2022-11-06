# Taken and adapted from https://medium.com/@jwdobken/develop-quasar-applications-with-docker-a19c38d4a6ac

# development stage
FROM node:lts-alpine3.14 as development-stage
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL=$VUE_APP_API_URL
WORKDIR /app
COPY package*.json ./
RUN npm install -g @quasar/cli
COPY . .

# build stage
FROM development-stage as build-stage
RUN npm install
RUN quasar build

# production stage
FROM nginx:1.17.5-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]