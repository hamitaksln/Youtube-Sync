FROM node:16

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN cd client && npm install && npm run build

EXPOSE 3333
CMD ["npm","start"]