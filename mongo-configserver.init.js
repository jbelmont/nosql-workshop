rs.initiate(
    {
       _id: "mongo-configserver",
       configsvr: true,
       version: 1,
       members: [
          { _id: 0, host : "mongo-cfg-server-01:27017" },
          { _id: 1, host : "mongo-cfg-server-02:27017" },
          { _id: 2, host : "mongo-cfg-server-01:27017" }
       ]
    }
 )