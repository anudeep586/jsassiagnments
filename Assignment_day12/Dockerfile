
FROM node:12


WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm","run","watch-server"]

# FROM node:16

# WORKDIR /src/

# COPY package*.json ./

# RUN npm install


# COPY . .

# EXPOSE 3030


# CMD ["npm run watch-server","server.ts"]