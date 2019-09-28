FROM mongo:4.0.5

# Create app directory
WORKDIR /usr/src/configs

# Add script files to replica set
COPY mongo-replica-setup/setup-replicaset.sh .

RUN ["chmod", "+x", "./setup-replicaset.sh"]
CMD ["./setup-replicaset.sh"]
