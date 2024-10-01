#!/bin/bash

echo "Init ..."

mongod &

until pgrep mongo > /dev/null; do
>&2 echo "Mongo is unavailable - sleeping"
  sleep 2
done

mongo_indexof_db=$(mongosh --quiet --eval "db.getMongo().getDBNames().indexOf('$DATABASE_NAME')")

echo "index ===== $mongo_indexof_db"

if [ $mongo_indexof_db -ne "-1" ]; then
    echo "MongoDB database exists"
else
    mongoimport --db=${DATABASE_NAME} --collection='Post' --file='courses_data.json' --jsonArray
    echo "MongoDB database does not exist"
fi

wait
