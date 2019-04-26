NoSQL Workshop - Column Database

## Sections:

* [Definition of a Column Database](#definition-of-a-column-database)
* [Usage of a Column Database](#usage-of-a-column-database)
* [Bread Crumb Navigation](#bread-crumb-navigation)

*[Column Database Wikipedia Post](https://en.wikipedia.org/wiki/Column_%28data_store%29)*

## Definition of a Column Database

> A column of a distributed data store is a NoSQL object of the lowest level in a keyspace. It is a tuple (a key–value pair) consisting of three elements:

* Unique name: Used to reference the column

* Value: The content of the column. It can have different types, like AsciiType, LongType, TimeUUIDType, UTF8Type among others.

* Timestamp: The system timestamp used to determine the valid content.

## Usage of a Column Database

> In relational databases, a column is a part of a relational table that can be seen in each row of the table. This is not the case in distributed data stores, where the concept of a table only vaguely exists. A column can be part of a ColumnFamily that resembles at most a relational row, but it may appear in one row and not in the others. Also, the number of columns may change from row to row, and new updates to the data store model may also modify the column number. So, all the work of keeping up with changes relies on the application programmer.

## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [Key-Value Database](./key-value-database.md) | [Document Database](./document-database.md) →
