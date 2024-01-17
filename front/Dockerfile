FROM node:18-alpine
WORKDIR /usr/

COPY package*.json ./
COPY tsconfig*.json ./
COPY angular.json ./
RUN npm install

COPY . ./
EXPOSE 4200
CMD ["npm", "start"]
