FROM node:19 AS prod

WORKDIR /app
COPY . .

RUN npm install -g @nestjs/cli
RUN npm install pg --save
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/main.js" ]

FROM node:19 AS dev
WORKDIR /app/
COPY . ./

RUN npm install -g @nestjs/cli
RUN npm install pg --save
RUN npm install
EXPOSE 3000
CMD [ "npm", "run","start:dev"]
