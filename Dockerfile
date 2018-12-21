FROM node:11.2.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY server /usr/src/app/server
COPY public /usr/src/app/public
COPY src /usr/src/app/src
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install react-scripts@1.1.1 -g --silent
# start app
CMD ["npm", "start"]