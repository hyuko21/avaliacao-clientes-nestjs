FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# install dependencies
RUN yarn

COPY . .

EXPOSE 4202

CMD ["nest", "start"]