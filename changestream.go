package main

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/writeconcern"
	"go.mongodb.org/mongo-driver/x/bsonx"
)

const (
	mongoURI = "mongodb://localhost:30021"
)

var wcMajority = writeconcern.New(writeconcern.WMajority())
var ctx context.Context

func main() {
	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)

	// Stream will throw an error if the server response is missing the resume token
	idDoc := bsonx.Doc{
		{
			Key:   "_id",
			Value: bsonx.Int32(0),
		},
	}
	pipeline := []bsonx.Doc{
		bsonx.Doc{
			{
				Key:   "$project",
				Value: bsonx.Document(idDoc),
			},
		},
	}
	collection, stream := createChangeStream(client, "nosql_workshop", "contacts", pipeline)
	defer stream.Close(ctx)

	document := bsonx.Doc{
		bsonx.Elem{
			Key:   "platform",
			Value: bsonx.String("go111"),
		},
	}
	_, err = collection.InsertOne(ctx, document)
	if err != nil {
		log.Printf("An error occurred inserting document: %+v", document)
	}
}

func createChangeStream(client *mongo.Client, dbName string, collName string, pipeline interface{}, opts ...*options.ChangeStreamOptions) (*mongo.Collection, *mongo.ChangeStream) {
	if pipeline == nil {
		pipeline = mongo.Pipeline{}
	}

	db := client.Database(dbName)
	err := db.Drop(ctx)

	coll := db.Collection(collName)
	var collectionStartingDoc = bsonx.Doc{
		{
			Key:   "y",
			Value: bsonx.Int32(1),
		},
	}
	_, err = coll.InsertOne(ctx, collectionStartingDoc)

	stream, err := coll.Watch(ctx, pipeline, opts...)
	if err != nil {
		log.Printf("An error occured watching change stream")
	}

	return coll, stream
}
