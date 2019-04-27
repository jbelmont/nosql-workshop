FROM mongo:4.0.5

# Workdir configs directory
WORKDIR /usr/src/nosql_workshop

# Copy config files
COPY . ${WORKDIR}

EXPOSE 27017
