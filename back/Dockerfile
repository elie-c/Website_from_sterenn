FROM node:19
WORKDIR /app
COPY . .

RUN npm install -g @nestjs/cli
RUN npm install pg --save
RUN npm i --save amqplib amqp-connection-manager
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/main.js"]
