#!/bin/bash
# Remove this in production 
docker rm -f $(docker ps -aq)
# make sure we have enough memory to run our service 
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
# source the env file 
source .env
# Build images 
docker-compose build couchdb
docker-compose build app
# # run couch base 
docker-compose run -d   -e COUCHDB_USER=$HOSTEDCOUCH -e COUCHDB_PASSWORD=$HOSTEDCOUCHPASSWORD --service-ports --name couchdb couchdb
# reun the app 
# docker-compose run  -d --service-ports  --name app app

echo "Please Wait!!! starting up client Server"
sleep 90 && source .env
docker rm -f app
docker-compose build app
docker-compose run  --service-ports  --name app app

echo "Ready Tiger"


