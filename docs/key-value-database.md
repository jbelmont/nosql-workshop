NoSQL Workshop - Key-Value Database

## Sections:

* [Definition of a Key-Value Database](#definition-of-a-key\-value-database)
* [List of Key-Value Databases](#list-of-key\-value-databases)
* [Bread Crumb Navigation](#bread-crumb-navigation)

*[Key-Value Database Wikipedia Post](https://en.wikipedia.org/wiki/Key-value_database)*

## Definition of a Key-Value Database

> A key-value database, or key-value store, is a data storage paradigm designed for storing, retrieving, and managing associative arrays, a data structure more commonly known today as a dictionary or hash table. Dictionaries contain a collection of objects, or records, which in turn have many different fields within them, each containing data. These records are stored and retrieved using a key that uniquely identifies the record, and is used to quickly find the data within the database.

> Key-value databases work in a very different fashion from the better known relational databases (RDB). RDBs pre-define the data structure in the database as a series of tables containing fields with well defined data types. Exposing the data types to the database program allows it to apply a number of optimizations. In contrast, key-value systems treat the data as a single opaque collection, which may have different fields for every record. This offers considerable flexibility and more closely follows modern concepts like object-oriented programming. Because optional values are not represented by placeholders or input parameters, as in most RDBs, key-value databases often use far less memory to store the same database, which can lead to large performance gains in certain workloads.[citation needed]

> Performance, a lack of standardization and other issues limited key-value systems to niche uses for many years, but the rapid move to cloud computing after 2010 has led to a renaissance as part of the broader NoSQL movement. Some graph databases are also key-value databases internally, adding the concept of the relationships (pointers) between records as a first class data type.

## Some Key-Value Databases

* [DynamoDB](https://aws.amazon.com/dynamodb/)
* [Oracle NoSQL Database](https://www.oracle.com/database/technologies/related/nosql.html)
* [Project Voldemort](http://www.project-voldemort.com/voldemort/)
* [Riak](https://riak.com/products/#riak)

## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [Types of NoSQL Databases](./types-of-nosql-databases.md) | [Column Database](./column-database.md) →
