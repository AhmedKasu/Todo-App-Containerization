FROM node:16

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3000

CMD ["npm", "start"]