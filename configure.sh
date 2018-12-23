# set -m

/entrypoint.sh couchbase-server &
docker run -e COUCHDB_USER=$COUCHBASE_ADMINISTRATOR_USERNAME -e COUCHDB_PASSWORD=$COUCHBASE_ADMINISTRATOR_PASSWORD -d couchdb
sleep 15


