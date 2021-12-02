FROM node:14
WORKDIR /usr/src/app
COPY package.json ./
COPY . .
EXPOSE 3003
CMD [ "node", "index.js" ]
RUN npm install