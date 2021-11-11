FROM node:14
WORKDIR /usr/src/app
COPY package.json ./
COPY . .
EXPOSE 3002
CMD [ "node", "index.js" ]
RUN npm install