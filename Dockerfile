FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

# client
COPY ./client/package.json ./client/
RUN npm install --prefix client --legacy-peer-deps

# server
COPY ./server/package.json ./server/
RUN npm install --prefix server

COPY . .

RUN npm run build:all

EXPOSE 8080

CMD ["npm", "start"]
