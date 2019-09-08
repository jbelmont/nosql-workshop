#! /bin/bash

## Generate global auth key between cluster nodes
openssl rand -base64 756 > mongodb.key
chmod 600 mongodb.key

docker-compose -f docker-compose.sharding.yml up