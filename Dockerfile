FROM node:20-alpine3.17 AS base

LABEL version="1.0"
LABEL description="This is the base docker image for the synonyms search frontend API."
LABEL maintainer = ["tao_sun@hotmail.com"]

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install 
COPY . .

EXPOSE 3000

CMD ["npm", "start"]