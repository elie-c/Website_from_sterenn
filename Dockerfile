FROM node:18-alpine AS build
WORKDIR /app

COPY front/ .
RUN npm install
RUN npm run build

# Serve Application using Nginx Server
FROM nginx:1.23.2
COPY --from=build /app/dist/fr-administration-front/browser/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80


