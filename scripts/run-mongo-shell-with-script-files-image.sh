#! /bin/bash

docker run --name mongo-image-4-with-scripts \
  --rm \
  -v ~/mongod_data.4.0.5:/data/db \
  -p 27017:27017 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -d jbelmont/nosql-mongo-image-with-scripts:v1
