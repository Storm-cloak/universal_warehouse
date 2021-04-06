# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

# add app
COPY . ./

RUN export PORT=3001

EXPOSE 3001

# start app
CMD ["npm", "start"]