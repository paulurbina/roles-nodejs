FROM node:12.18.3-alpine3.9

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm install -g nodemon

CMD [ "npm", "run", "dev" ]