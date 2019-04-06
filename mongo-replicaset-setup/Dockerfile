FROM mongo:4.0.5

# Create app directory
WORKDIR /usr/src/nosql_workshop

# Install app dependencies
COPY replicaset.js .
COPY replicaset.sh .

RUN ["chmod", "+x", "/usr/src/nosql_workshop/replicaset.sh"]

CMD ["/usr/src/nosql_workshop/replicaset.sh"]