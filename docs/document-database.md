NoSQL Workshop - Document Database

## Sections:

* [Definition of a Document Database](#definition-of-a-document-database)
* [CRUD Operations](#crud-operations)
* [List of Document Databases](#list-of-document-databases)
* [Bread Crumb Navigation](#bread-crumb-navigation)

## Definition of a Document Database

> A document-oriented database, or document store, is a computer program designed for storing, retrieving and managing document-oriented information, also known as semi-structured data.

> Document-oriented databases are one of the main categories of NoSQL databases, and the popularity of the term "document-oriented database" has grown with the use of the term NoSQL itself. XML databases are a subclass of document-oriented databases that are optimized to work with XML documents. Graph databases are similar, but add another layer, the relationship, which allows them to link documents for rapid traversal.

> Document-oriented databases are inherently a subclass of the key-value store, another NoSQL database concept. The difference lies in the way the data is processed; in a key-value store, the data is considered to be inherently opaque to the database, whereas a document-oriented system relies on internal structure in the document in order to extract metadata that the database engine uses for further optimization. Although the difference is often moot due to tools in the systems, conceptually the document-store is designed to offer a richer experience with modern programming techniques.

> Document databases contrast strongly with the traditional relational database (RDB). Relational databases generally store data in separate tables that are defined by the programmer, and a single object may be spread across several tables. Document databases store all information for a given object in a single instance in the database, and every stored object can be different from every other. This eliminates the need for object-relational mapping while loading data into the database.

> The central concept of a document-oriented database is the notion of a document. While each document-oriented database implementation differs on the details of this definition, in general, they all assume documents encapsulate and encode data (or information) in some standard format or encoding. Encodings in use include XML, YAML, JSON, and BSON, as well as binary forms like PDF and Microsoft Office documents (MS Word, Excel, and so on).

Documents in a document store are roughly equivalent to the programming concept of an object. They are not required to adhere to a standard schema, nor will they have all the same sections, slots, parts or keys. Generally, programs using objects have many different types of objects, and those objects often have many optional fields. Every object, even those of the same class, can look very different. Document stores are similar in that they allow different types of documents in a single store, allow the fields within them to be optional, and often allow them to be encoded using different encoding systems. For example, the following is a document, encoded in JSON:

```
{
	"_id" : ObjectId("5c7b07e38a0730edba859aef"),
	"name" : "Sue",
	"age" : 26,
	"status" : "pending"
}
```

## CRUD Operations

> The core operations that a document-oriented database supports for documents are similar to other databases, and while the terminology is not perfectly standardized, most practitioners will recognize them as CRUD:

* Creation (or insertion)
* Retrieval (or query, search, read or find)
* Update (or edit)
* Deletion (or removal)

## List of Document Databases

*Please check out the following [Wikipedia Table on Document Databases](https://en.wikipedia.org/wiki/Document-oriented_database#Implementations)*

## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [Column Database](./column-database.md) | [Graph Database](./graph-database.md) →
