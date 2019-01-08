# set -m

docker run -d --name couchdb  -v /couchdb_data:/opt/couchdb/data  -e COUCHDB_USER=$HOSTEDCOUCH -e COUCHDB_PASSWORD=$HOSTEDCOUCHPASSWORD -p 5984:5984 klaemo/couchdb:latest
sleep 15 


