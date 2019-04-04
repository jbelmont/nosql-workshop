NoSQL Workshop - Mongo Data Models

## Sections:

* [Data Modeling Concepts](#data-modeling-concepts)
* [Data Model Examples and Patterns](#data-model-examples-and-patterns)
* [Data Model Reference](#data-model-reference)
* [Bread Crumb Navigation](#bread-crumb-navigation)

*All of this information is from [Data Modeling Part II](https://docs.mongodb.com/manual/tutorial/model-embedded-one-to-one-relationships-between-documents/)*

## Data Modeling Concepts

[Data Model Design](https://docs.mongodb.com/manual/core/data-model-design/)

> With MongoDB, you may embed related data in a single structure or document. These schema are generally known as “denormalized” models, and take advantage of MongoDB’s rich documents. Consider the following diagram:

*user document:*

```js
{
    _id: ObjectId("12345"),
    username: "jbelmont",
    contact: {
      phone: "910-923-4556",
      email: "somebody@hey.com"
    },
    access: {
      level: 5,
      group: "dev"
    }
}
```

*Notice that the user document has 2 embedded documents: contact and access respectively.*

*contact document:*

```js
{
    id: ObjectId("some1345"),
    phone: "910-923-4556",
    email: "somebody@hey.com"
}
```

*access document:*

```js
{
   id: ObjectId("some1345"),
   level: 5,
   group: "dev"
}
```

> Embedded data models allow applications to store related pieces of information in the same database record. As a result, applications may need to issue fewer queries and updates to complete common operations.

> In general, use embedded data models when:

* you have "contains" relationships between entities.

* you have one-to-many relationships between entities. In these relationships the "many" or child documents always appear with or are viewed in the context of the "one" or parent documents. See Model One-to-Many Relationships with Embedded Documents.
In general, embedding provides better performance for read operations, as well as the ability to request and retrieve related data in a single database operation. Embedded data models make it possible to update related data in a single atomic write operation.

* To access data within embedded documents, use dot notation to "reach into" the embedded documents. See query for data in arrays and query data in embedded documents for more examples on accessing data in arrays and embedded documents.

#### Normalized Data Models

*user document:*

```js
{
    _id: ObjectId("12345"),
    username: "jbelmont"
}
```

*contact document:*

```js
{
    id: ObjectId("some1345"),
    user_id: ObjectId("12345"),
    phone: "910-923-4556",
    email: "somebody@hey.com"
}
```

```js
{
   id: ObjectId("some1345"),
   user_id: ObjectId("12345"),
   level: 5,
   group: "dev"
}
```

* In general, use normalized data models:

* when embedding would result in duplication of data but would not provide sufficient read performance advantages to outweigh the implications of the duplication.
to represent more complex many-to-many relationships.
to model large hierarchical data sets.
References provides more flexibility than embedding. However, client-side applications must issue follow-up queries to resolve the references. In other words, normalized data models can require more round trips to the server.

## Data Model Examples and Patterns

#### Model One-to-One Relationships with Embedded Documents

[Model One-to-One Relationships with Embedded Documents¶](https://docs.mongodb.com/manual/tutorial/model-embedded-one-to-one-relationships-between-documents/)

> Consider the following example that maps patron and address relationships. The example illustrates the advantage of embedding over referencing if you need to view one data entity in context of the other. In this one-to-one relationship between patron and address data, the address belongs to the patron.

> In the normalized data model, the address document contains a reference to the patron document.


```js
// address doc
{
   _id: "joe",
   name: "Joe Bookreader"
}

// patron doc
{
   patron_id: "joe",
   street: "123 Fake Street",
   city: "Faketon",
   state: "MA",
   zip: "12345"
}
```

> If the address data is frequently retrieved with the name information, then with referencing, your application needs to issue multiple queries to resolve the reference. The better data model would be to embed the address data in the patron data, as in the following document:

```js
// In here address document information is embedded into patron document.
{
   _id: "joe",
   name: "Joe Bookreader",
   address: {
              street: "123 Fake Street",
              city: "Faketon",
              state: "MA",
              zip: "12345"
            }
}
```

> With the embedded data model, your application can retrieve the complete patron information with one query.

#### Model One-to-Many Relationships with Embedded Documents

[Model One-to-Many Relationships with Embedded Documents](https://docs.mongodb.com/manual/tutorial/model-embedded-one-to-many-relationships-between-documents/)

> Consider the following example that maps patron and multiple address relationships. The example illustrates the advantage of embedding over referencing if you need to view many data entities in context of another. In this one-to-many relationship between patron and address data, the patron has multiple address entities.

> In the normalized data model, the address documents contain a reference to the patron document.

```js
// It is normalized since patron_id is a reference to the patron document that you would fetch.
{
   _id: "joe",
   name: "Joe Bookreader"
}

{
   patron_id: "joe",
   street: "123 Fake Street",
   city: "Faketon",
   state: "MA",
   zip: "12345"
}

{
   patron_id: "joe",
   street: "1 Some Other Street",
   city: "Boston",
   state: "MA",
   zip: "12345"
}
```

> If your application frequently retrieves the address data with the name information, then your application needs to issue multiple queries to resolve the references. A more optimal schema would be to embed the address data entities in the patron data, as in the following document:

```js
{
   _id: "joe",
   name: "Joe Bookreader",
   addresses: [
      {
         street: "123 Fake Street",
         city: "Faketon",
         state: "MA",
         zip: "12345"
      },
      {
         street: "1 Some Other Street",
         city: "Boston",
         state: "MA",
         zip: "12345"
      }
   ]
 }
```

> With the embedded data model, your application can retrieve the complete patron information with one query.

#### Model One-to-Many Relationships with Document References

[Model One-to-Many Relationships with Document References](https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/)

> Consider the following example that maps publisher and book relationships. The example illustrates the advantage of referencing over embedding to avoid repetition of the publisher information.

> Embedding the publisher document inside the book document would lead to repetition of the publisher data, as the following documents show:

```js
{
   title: "MongoDB: The Definitive Guide",
   author: [ "Kristina Chodorow", "Mike Dirolf" ],
   published_date: ISODate("2010-09-24"),
   pages: 216,
   language: "English",
   // duplicate embedded document
   publisher: {
      name: "O'Reilly Media",
      founded: 1980,
      location: "CA"
   }
}

{
   title: "50 Tips and Tricks for MongoDB Developer",
   author: "Kristina Chodorow",
   published_date: ISODate("2011-05-06"),
   pages: 68,
   language: "English",
   // duplicate embedded document
   publisher: {
      name: "O'Reilly Media",
      founded: 1980,
      location: "CA"
   }
}
```

> To avoid repetition of the publisher data, use references and keep the publisher information in a separate collection from the book collection.

> When using references, the growth of the relationships determine where to store the reference. If the number of books per publisher is small with limited growth, storing the book reference inside the publisher document may sometimes be useful. Otherwise, if the number of books per publisher is unbounded, this data model would lead to mutable, growing arrays, as in the following example:

```js
{
   name: "O'Reilly Media",
   founded: 1980,
   location: "CA",
   books: [123456789, 234567890, ...]

}

{
    _id: 123456789,
    title: "MongoDB: The Definitive Guide",
    author: [ "Kristina Chodorow", "Mike Dirolf" ],
    published_date: ISODate("2010-09-24"),
    pages: 216,
    language: "English"
}

{
   _id: 234567890,
   title: "50 Tips and Tricks for MongoDB Developer",
   author: "Kristina Chodorow",
   published_date: ISODate("2011-05-06"),
   pages: 68,
   language: "English"
}
```

> To avoid mutable, growing arrays, store the publisher reference inside the book document:

```js
{
   _id: "oreilly",
   name: "O'Reilly Media",
   founded: 1980,
   location: "CA"
}

{
   _id: 123456789,
   title: "MongoDB: The Definitive Guide",
   author: [ "Kristina Chodorow", "Mike Dirolf" ],
   published_date: ISODate("2010-09-24"),
   pages: 216,
   language: "English",
   publisher_id: "oreilly"
}

{
   _id: 234567890,
   title: "50 Tips and Tricks for MongoDB Developer",
   author: "Kristina Chodorow",
   published_date: ISODate("2011-05-06"),
   pages: 68,
   language: "English",
   publisher_id: "oreilly"
}
```

*Notice that we use the name of the publisher here "oreilly"*

#### MongoDB Data Models Tree Structures

Please read the official docs on [MongoDB Data Models Tree Structures](https://docs.mongodb.com/manual/applications/data-models-tree-structures/)

## Data Model Reference

Please read the official docs for [Data Model References](https://docs.mongodb.com/manual/reference/database-references/)

## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [MongoDB Data Models Part I](./mongodb_data_models_part_I.md) | [MongoDB Transactions](./mongodb_transactions.md) →
