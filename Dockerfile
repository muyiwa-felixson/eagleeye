FROM node:11.2.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install react-scripts@1.1.1 -g --silent
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY server /usr/src/app/server
COPY public /usr/src/app/public
COPY src /usr/src/app/src
# EXPOSE 80
# start app
CMD ["npm", "start"]