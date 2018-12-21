
# Free up resources and ports 
kill -9 $(lsof -t -i:3333)
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:8091)
kill -9 $(lsof -t -i:8092)
kill -9 $(lsof -t -i:8093)
# make sure we have enough memory to run our service 
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
# source the env file 
source .env
# Build images 
docker-compose build couchbase
docker-compose build app
# run couch base 
docker-compose run -d --service-ports --name couchbase couchbase
# reun the app 
docker-compose up
