FROM node:19

WORKDIR /app
COPY . .

RUN npm install -g @nestjs/cli
RUN npm install
RUN npm install pg --save
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/main.js" ]

#FROM node:19 AS dev
#WORKDIR /app
#COPY . .

#RUN npm install -g @nestjs/cli
#RUN npm install
#RUN npm install pg --save
#EXPOSE 3000
#CMD [ "npm", "run","start:dev"]
