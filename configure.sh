# set -m

/entrypoint.sh couchbase-server &
docker run -d --name couchdb  -v /couchdb_data:/data -e COUCHDB_USER=$HOSTEDCOUCH -e COUCHDB_PASSWORD=$HOSTEDCOUCHPASSWORD -p 5984:5984 frodenas/couchdb
sleep 15 


