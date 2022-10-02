
FROM node:12


WORKDIR /src

COPY package*.json ./
ADD package*.json ./

RUN npm install

COPY . .
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait



EXPOSE 8080

CMD ["npm","run","watch-server"]

# FROM node:16

# WORKDIR /src/

# COPY package*.json ./

# RUN npm install


# COPY . .

# EXPOSE 3030


# CMD ["npm run watch-server","server.ts"]