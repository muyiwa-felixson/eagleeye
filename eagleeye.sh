
# Free up resources and ports 
kill -9 $(lsof -t -i:3333)
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:8091)
kill -9 $(lsof -t -i:8092)
kill -9 $(lsof -t -i:8093)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
source .env
docker-compose build couchbase
docker-compose build app
