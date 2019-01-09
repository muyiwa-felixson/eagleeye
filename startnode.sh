
# Remove this in production 
source .env
docker rm -f app
docker-compose build app
docker-compose run  --service-ports  --name app app


