FROM node:11.2.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package-lock.json /usr/src/app/package-lock.json
COPY package.json /usr/src/app/package.json
RUN npm ci
RUN npm install react-scripts@1.1.1 -g --silent
# start app
CMD ["npm", "start"]