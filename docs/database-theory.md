NoSQL Workshop - Database Theory

## Sections:

* [Definition of a Database](#definition-of-a-database)
* [History of Databases](#history-of-databases)
* [Database Classification](#database-classification)
* [Database Languages](#database-languages)
* [History of NoSQL Databases](#history-of-nosql-databases)
* [Bread Crumb Navigation](#bread-crumb-navigation)

## Definition of a Database

We can describe a database to be much like an electronic filing cabinet while the information has been digitized. The information is kept in a persistent storage mechanism such as with magnetic disks. Database users can create/insert new data into the database, change, delete, or retrieve existing information in the database by issuing commands/requests to the database system. This system is commonly called the Database Management System (DBMS).

## History of Databases

Please check out this site for [Learning Computing History on Databases](http://www.comphist.org/computing_history/new_page_9.htm)

## Database Classification

[Database Classification](https://en.wikipedia.org/wiki/Database#Classification)

**All the information is from the wikipedia Page**

Differenty Types of Databases:

* An in-memory database is a database that primarily resides in main memory, but is typically backed-up by non-volatile computer data storage. Main memory databases are faster than disk databases, and so are often used where response time is critical, such as in telecommunications network equipment.

* An active database includes an event-driven architecture which can respond to conditions both inside and outside the database. Possible uses include security monitoring, alerting, statistics gathering and authorization. Many databases provide active database features in the form of database triggers.

* A cloud database relies on cloud technology. Both the database and most of its DBMS reside remotely, "in the cloud", while its applications are both developed by programmers and later maintained and used by end-users through a web browser and Open APIs.

* Data warehouses archive data from operational databases and often from external sources such as market research firms. The warehouse becomes the central source of data for use by managers and other end-users who may not have access to operational data. For example, sales data might be aggregated to weekly totals and converted from internal product codes to use UPCs so that they can be compared with ACNielsen data. Some basic and essential components of data warehousing include extracting, analyzing, and mining data, transforming, loading, and managing data so as to make them available for further use.

* A deductive database combines logic programming with a relational database.

* A distributed database is one in which both the data and the DBMS span multiple computers.

* A document-oriented database is designed for storing, retrieving, and managing document-oriented, or semi structured, information. Document-oriented databases are one of the main categories of NoSQL databases.

* An embedded database system is a DBMS which is tightly integrated with an application software that requires access to stored data in such a way that the DBMS is hidden from the application's end-users and requires little or no ongoing maintenance.

* End-user databases consist of data developed by individual end-users. Examples of these are collections of documents, spreadsheets, presentations, multimedia, and other files. Several products exist to support such databases. Some of them are much simpler than full-fledged DBMSs, with more elementary DBMS functionality.

* A federated database system comprises several distinct databases, each with its own DBMS. It is handled as a single database by a federated database management system (FDBMS), which transparently integrates multiple autonomous DBMSs, possibly of different types (in which case it would also be a heterogeneous database system), and provides them with an integrated conceptual view.

* Sometimes the term multi-database is used as a synonym to federated database, though it may refer to a less integrated (e.g., without an FDBMS and a managed integrated schema) group of databases that cooperate in a single application. In this case, typically middleware is used for distribution, which typically includes an atomic commit protocol (ACP), e.g., the two-phase commit protocol, to allow distributed (global) transactions across the participating databases.

* A graph database is a kind of NoSQL database that uses graph structures with nodes, edges, and properties to represent and store information. General graph databases that can store any graph are distinct from specialized graph databases such as triplestores and network databases.

* An array DBMS is a kind of NoSQL DBMS that allows modeling, storage, and retrieval of (usually large) multi-dimensional arrays such as satellite images and climate simulation output.

* In a hypertext or hypermedia database, any word or a piece of text representing an object, e.g., another piece of text, an article, a picture, or a film, can be hyperlinked to that object. Hypertext databases are particularly useful for organizing large amounts of disparate information. For example, they are useful for organizing online encyclopedias, where users can conveniently jump around the text. The World Wide Web is thus a large distributed hypertext database.

* A knowledge base (abbreviated KB, kb or Δ) is a special kind of database for knowledge management, providing the means for the computerized collection, organization, and retrieval of knowledge. Also a collection of data representing problems with their solutions and related experiences.

* A mobile database can be carried on or synchronized from a mobile computing device.

* Operational databases store detailed data about the operations of an organization. They typically process relatively high volumes of updates using transactions. Examples include customer databases that record contact, credit, and demographic information about a business's customers, personnel databases that hold information such as salary, benefits, skills data about employees, enterprise resource planning systems that record details about product components, parts inventory, and financial databases that keep track of the organization's money, accounting and financial dealings.

* A parallel database seeks to improve performance through parallelization for tasks such as loading data, building indexes and evaluating queries.

* The major parallel DBMS architectures which are induced by the underlying hardware architecture are:

* Shared memory architecture, where multiple processors share the main memory space, as well as other data storage.

* Shared disk architecture, where each processing unit (typically consisting of multiple processors) has its own main memory, but all units share the other storage.

* Shared nothing architecture, where each processing unit has its own main memory and other storage.

* Probabilistic databases employ fuzzy logic to draw inferences from imprecise data.

* Real-time databases process transactions fast enough for the result to come back and be acted on right away.

* A spatial database can store the data with multidimensional features. The queries on such data include location-based queries, like "Where is the closest hotel in my area?".

* A temporal database has built-in time aspects, for example a temporal data model and a temporal version of SQL. More specifically the temporal aspects usually include valid-time and transaction-time.

* A terminology-oriented database builds upon an object-oriented database, often customized for a specific field.

* An unstructured data database is intended to store in a manageable and protected way diverse objects that do not fit naturally and conveniently in common databases. It may include email messages, documents, journals, multimedia objects, etc. The name may be misleading since some objects can be highly structured. However, the entire possible object collection does not fit into a predefined structured framework. Most established DBMSs now support unstructured data in various ways, and new dedicated DBMSs are emerging.

## Database Languages

**All the information is from the wikipedia Page**

[Database Languages](https://en.wikipedia.org/wiki/Database#Database_languages)

> Database languages are special-purpose languages, which allow one or more of the following tasks, sometimes distinguished as sublanguages:

* Data control language (DCL) – controls access to data;

* Data definition language (DDL) – defines data types such as creating, altering, or dropping and the relationships among them;

* Data manipulation language (DML) – performs tasks such as inserting, updating, or deleting data occurrences;

* Data query language (DQL) – allows searching for information and computing derived information.
Database languages are specific to a particular data model. Notable examples include:

> SQL combines the roles of data definition, data manipulation, and query in a single language. It was one of the first commercial languages for the relational model, although it departs in some respects from the relational model as described by Codd (for example, the rows and columns of a table can be ordered). SQL became a standard of the American National Standards Institute (ANSI) in 1986, and of the International Organization for Standardization (ISO) in 1987. The standards have been regularly enhanced since and is supported (with varying degrees of conformance) by all mainstream commercial relational DBMSs.

> OQL is an object model language standard (from the Object Data Management Group). It has influenced the design of some of the newer query languages like JDOQL and EJB QL.
XQuery is a standard XML query language implemented by XML database systems such as MarkLogic and eXist, by relational databases with XML capability such as Oracle and DB2, and also by in-memory XML processors such as Saxon.
SQL/XML combines XQuery with SQL.

A database language may also incorporate features like:

*  DBMS-specific configuration and storage engine management

* Computations to modify query results, like counting, summing, averaging, sorting, grouping, and cross-referencing

* Constraint enforcement (e.g. in an automotive database, only allowing one engine type per car)

* Application programming interface version of the query language, for programmer convenience

## History of NoSQL Databases

[History of NoSQL Databases](https://en.wikipedia.org/wiki/NoSQL#History)

> The term NoSQL was used by Carlo Strozzi in 1998 to name his lightweight Strozzi NoSQL open-source relational database that did not expose the standard Structured Query Language (SQL) interface, but was still relational. His NoSQL RDBMS is distinct from the circa-2009 general concept of NoSQL databases. Strozzi suggests that, because the current NoSQL movement "departs from the relational model altogether, it should therefore have been called more appropriately 'NoREL', referring to 'No Relational'.

> Johan Oskarsson, then a developer at Last.fm, reintroduced the term NoSQL in early 2009 when he organized an event to discuss "open source distributed, non relational databases". The name attempted to label the emergence of an increasing number of non-relational, distributed data stores, including open source clones of Google's Bigtable/MapReduce and Amazon's DynamoDB.


## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [README](../README.md) | [Data Modeling](./data-modeling.md) →
