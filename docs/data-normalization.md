NoSQL Workshop - Database Normalization

## Sections:

* [Data Normalization Definition](#data-normalization-definition)
* [Normalization Objectives](#normalization-objectives)
* [Bread Crumb Navigation](#bread-crumb-navigation)

**All of this information comes from [Data Normalization Definition Wikipedia Page](https://en.wikipedia.org/wiki/Database_normalization)**

## Data Normalization Definition 

> Database normalization is the process of structuring a relational database in accordance with a series of so-called normal forms in order to reduce data redundancy and improve data integrity. It was first proposed by [Edgar F. Codd](https://en.wikipedia.org/wiki/Edgar_F._Codd) as an integral part of his relational model.

> Normalization entails organizing the columns (attributes) and tables (relations) of a database to ensure that their dependencies are properly enforced by database integrity constraints. It is accomplished by applying some formal rules either by a process of synthesis (creating a new database design) or decomposition (improving an existing database design).

## Normalization Objectives 

> A basic objective of the first normal form defined by Codd in 1970 was to permit data to be queried and manipulated using a "universal data sub-language" grounded in first-order logic. (SQL is an example of such a data sub-language, albeit one that Codd regarded as seriously flawed.)

> The objectives of normalization beyond 1NF (first normal form) were stated as follows by Codd:

* To free the collection of relations from undesirable insertion, update and deletion dependencies.

* To reduce the need for restructuring the collection of relations, as new types of data are introduced, and thus increase the life span of application programs.

* To make the relational model more informative to users.

* To make the collection of relations neutral to the query statistics, where these statistics are liable to change as time goes by.

## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [Database Modeling](./data-modeling.md) | [ACID](./acid.md) →
