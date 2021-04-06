FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install
RUN chown -R $USER:$(id -gn $USER) /root/.config

COPY . .

EXPOSE 3000

CMD ["npm", "start"]