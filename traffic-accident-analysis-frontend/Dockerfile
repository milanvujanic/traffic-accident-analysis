FROM node:22-alpine3.20 AS vite-app

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:mainline-alpine3.20-slim

WORKDIR /usr/share/nginx/

RUN rm -rf html

RUN mkdir html

WORKDIR /

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=vite-app ./app/dist /usr/share/nginx/html

EXPOSE 3000

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]