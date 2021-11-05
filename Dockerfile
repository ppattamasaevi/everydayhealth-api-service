FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir mongodata

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
