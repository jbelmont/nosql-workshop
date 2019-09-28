package main

import (
	"bytes"
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/gridfs"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	uri = "mongodb://localhost:30021"
)

func gridFS() {
	client, err := mongo.NewClient(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("Could not setup new mongo client")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)

	db := client.Database("gridFSTestDB")

	bucket, err := gridfs.NewBucket(db)
	if err != nil {
		log.Fatal("Could not create bucket")
	}

	err = bucket.SetWriteDeadline(time.Now().Add(10 * time.Second))
	if err != nil {
		log.Fatalf("Failed to set write deadline: %v", err)
	}

	byteData := []byte("GridFS, Example for NoSQL Workshop!")
	r := bytes.NewReader(byteData)

	id, err := bucket.UploadFromStream("filename", r)
	if err != nil {
		log.Fatalf("Failed to open upload stream: %v", err)
	}

	fmt.Println(id)
}
