NoSQL Workshop - Database Normalization

## Sections:

* [Data Normalization Definition](#data-normalization-definition)
* [Normalization Objectives](#normalization-objectives)
* [Database Normalization Forms](#database-normalization-froms)
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

## Database Normalization Forms 

[Edgar F. Codd](https://en.wikipedia.org/wiki/Edgar_F._Codd) introduced the concept of normalization and what is now known as the first normal form (1NF) in 1970. Codd went on to define the second normal form (2NF) and third normal form (3NF) in 1971, and Codd and Raymond F. Boyce defined the [Boyce-Codd normal form](https://en.wikipedia.org/wiki/Boyce%E2%80%93Codd_normal_form) (BCNF) in 1974.

> Informally, a relational database relation is often described as "normalized" if it meets third normal form. Most 3NF relations are free of insertion, update, and deletion anomalies.

The normal forms (from least normalized to most normalized) are:

* [UNF: Unnormalized form](https://en.wikipedia.org/wiki/Unnormalized_form)

* [1NF: First normal form](https://en.wikipedia.org/wiki/First_normal_form)

* [2NF: Second normal form](https://en.wikipedia.org/wiki/Second_normal_form)

* [3NF: Third normal form](https://en.wikipedia.org/wiki/Third_normal_form)

* [EKNF: Elementary key normal form](https://en.wikipedia.org/wiki/Elementary_key_normal_form)

* [BCNF: Boyce–Codd normal form](https://en.wikipedia.org/wiki/Boyce%E2%80%93Codd_normal_form)

* [4NF: Fourth normal form](https://en.wikipedia.org/wiki/Fourth_normal_form)

* [ETNF: Essential tuple normal form](https://en.wikipedia.org/wiki/Essential_tuple_normal_form)

* [5NF: Fifth normal form](https://en.wikipedia.org/wiki/Fifth_normal_form)

* [DKNF: Domain-key normal form](https://en.wikipedia.org/wiki/Domain-key_normal_form)

* [6NF: Sixth normal form](https://en.wikipedia.org/wiki/Sixth_normal_form)

Please read the [Database Normalization Wiki Post for more on normalization form details](https://en.wikipedia.org/wiki/Database_normalization#Example_of_a_step_by_step_normalization)

## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [Database Modeling](./data-modeling.md) | [ACID](./acid.md) →
