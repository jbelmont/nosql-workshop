NoSQL Workshop - Mongo Crud Operations

## Sections:

* [CRUD Operations](#crud-operations)
* [Insert Documents](#insert_documents)
* [Query Documents](#query_documents)
* [Update Documents](#update_documents)
* [Delete Documents](#delete_documents)
* [Bulk Write Operations](#bulk_write_operations)
* [Retryable Writes](#retryable_writes)
* [SQL to MongoDB Mapping Chart](#sql_to_mongodb_mapping_chart)
* [Text Search](#text_search)
* [Geospatial Queries](#geospatial_queries)
* [Read Isolation (Read Concern)](#read_isolation_(read_concern))
* [Write Acknowledgement (Write Concern)](#write_acknowledgement_(write_concern))
* [Bread Crumb Navigation](#bread-crumb-navigation)

*All of this information is gathered from the official mongodb docs in https://docs.mongodb.com/manual/crud/*

### CRUD operations

* CRUD ==> Create, Read, Update, and Delete Documents.

Create or insert operations add new documents to a collection. 

If the collection does not currently exist, insert operations will create the collection.

MongoDB provides the following methods to insert documents into a collection:

* [db.collection.insertOne()](https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/#db.collection.insertOne)

* [db.collection.insertMany()](https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#db.collection.insertMany)

In MongoDB, insert operations target a single collection. 

*All write operations in MongoDB are atomic on the level of a single document.*

```bash
db.people.insertOne( // collection
    {                        // document
        name: "John Rambo",  // field: value
        age: 34,             // field: value
        status: "MIA"        // field: value
    }
)
```

#### Read Operations

Read operations retrieves documents from a collection; i.e. queries a collection for documents. 

MongoDB provides the following methods to read documents from a collection:

* [db.collection.find()](https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find)

Let us look at an example in the mongo shell:

![find example](../images/db-find.png)

*Notice that in the example above we use projection and only age is returned back while the _id is always returned in MongoDB.*

#### Update Operations

Update operations modify existing documents in a collection. MongoDB provides the following methods to update documents of a collection:

* [db.collection.updateOne()](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#db.collection.updateOne)

* [db.collection.updateMany()](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/#db.collection.updateMany)

* [db.collection.replaceOne()](https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/#db.collection.replaceOne)

Let us look at an example in the mongo shell:

![db update](../images/db-update.png)

#### Delete Operations

Delete operations remove documents from a collection. MongoDB provides the following methods to delete documents of a collection:

* [db.collection.deleteOne()](https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/#db.collection.deleteOne)

* [db.collection.deleteMany()](https://docs.mongodb.com/manual/reference/method/db.collection.deleteMany/#db.collection.deleteMany)

In MongoDB, delete operations target a single collection. All write operations in MongoDB are atomic on the level of a single document.

You can specify criteria, or filters, that identify the documents to remove. These filters use the same syntax as read operations.

Let us look at some examples in the mongo shell:

![db delete](../images/db-delete.png)

*Notice that deleteMany deleted more than one document.*

#### Bulk Write

*MongoDB provides the ability to perform write operations in bulk.*

###### Insert Documents

[Insert Documents](https://docs.mongodb.com/manual/tutorial/insert-documents/)

*If the collection does not currently exist, insert operations will create the collection.*

![images/db-insert-one](../images/db-insert-one.png)

`db.collection.insertMany()` can insert multiple documents into a collection. 

Pass an array of documents to the method.

![images/db-insertmany](../images/db-insertmany.png)

Notice in the screenshot above that we created arrays in the mongo shell and then passed the numbers array into the insertMany collection method.

Also notice that the `insertMany()` method returns a document that includes the newly inserted documents _id field values.

*All write operations in MongoDB are atomic on the level of a single document.*

###### Insert Methods in mongodb

![images/db-insert-methods1](../images/db-insert-methods1.png)

Notice that in this screenshot we use insertOne to insert one document and insertMany to insert an array of documents.

![images/db-insert-methods2](../images/db-insert-methods2.png)

Notice that here we were able to pass an array into the `insert()` method as well like we did in the `insertMany()` method.

![images/db-insert-methods3](../images/db-insert-methods3.png)

Notice that in this screenshot we used an options object with a field of `upsert: true` to create a document that it did not exist already.

You can use the upsert option with the other write methods to create a document as well:

* [db.collection.updateOne()](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#db.collection.updateOne)
* [db.collection.updateMany()](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/#db.collection.updateMany)
* [db.collection.findAndModify()](https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/#db.collection.findAndModify)
* [db.collection.findOneAndUpdate()](https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/#db.collection.findOneAndUpdate)
* [db.collection.findOneAndReplace()](https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndReplace/#db.collection.findOneAndReplace)
* [db.collection.save()](https://docs.mongodb.com/manual/reference/method/db.collection.save/#db.collection.save)
* [db.collection.bulkWrite()](https://docs.mongodb.com/manual/reference/method/db.collection.bulkWrite/#db.collection.bulkWrite)

###### Query Documents

The most common method to query documents in mongodb is the `find()` method.

###### Select All Documents in a Collection

We can select all the documents in the numbers collection with the following query:

```js
db.numbers.find({})
```

This command is the equivalent to the following SQL command: `SELECT * FROM numbers`

###### Specify Equality Condition

You can pass in a query object to specify an equality condition in mongodb.

![images/db-find-query](../images/db-find-query.png)

*Notice that we only got back the number documents that match this query.*

###### Specify AND Conditions

![images/db-find-query2](../images/db-find-query2.png)

Notice that here we specified an additional condition here and in SQL this would be the equivalent query:

```sql
SELECT * FROM numbers WHERE type = "Decimal" AND value > 4.5
```

###### Specify OR Conditions

![images/db-find-query3](../images/db-find-query3.png)

Notice that in this query we specified an or condition and in SQL this would be the equivalent query:

```sql
SELECT * FROM numbers WHERE type = "Dont know" OR "val" = 19.8
```

###### Specify AND and OR Conditions

```js
db.inventory.find( {
     status: "A",
     $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
} )
```

This query will check the status of A and use the or condition of whether qty is less than 30 or item field starts with p

In SQL this would be the equivalent query:

```sql
SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")
```

*MongoDB supports regular expressions $regex queries to perform string pattern matches.*

###### Update Documents

Content

###### Delete Documents

Content

###### Bulk Write Operations

Content

###### Retryable Writes

Content

###### SQL to MongoDB Mapping Chart

Content

###### Text Search

Content

###### Geospatial Queries

Content

###### Read Isolation (Read Concern)

Content

###### Write Acknowledgement (Write Concern)

Content

#### Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [Mongo Shell](./mongo-shell.md) | [MongoDB Aggregation](./mongodb-aggregation.md) →
