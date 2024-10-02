#!/bin/bash

echo "Init ..."

mongod --bind_ip_all &

until mongosh --eval "db.runCommand({ ping: 1 })" > /dev/null 2>&1; do
>&2 echo "Mongo is unavailable - sleeping"
  sleep 2
done

mongo_indexof_db=$(mongosh --quiet --eval "db.getMongo().getDBNames().indexOf('$DATABASE_NAME')")

echo "index ===== $mongo_indexof_db"

if [ "$mongo_indexof_db" -lt 0 ]; then
    mongoimport --db=${DATABASE_NAME} --collection='Post' --file='courses_data.json' --jsonArray
    echo "MongoDB database does not exist"
else
    echo "MongoDB database exists"
fi

wait
