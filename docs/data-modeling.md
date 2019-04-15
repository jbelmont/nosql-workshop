NoSQL Workshop - Database Modeling

## Sections:

* [Definition of Data Modeling](#definition-of-data-modeling)
* [Data Modeling Topics](#data-modeling-topics)
* [Data Modeling Process](#data-modeling-process)
* [Data Modeling Techniques Blog Post](#data-modeling-techniques-blog-post)
* [Bread Crumb Navigation](#bread-crumb-navigation)

**All of this information comes from [Data Modeling Wikipedia Page](https://en.wikipedia.org/wiki/Data_modeling)**

## Definition of Data Modeling

> Data modeling is a process used to define and analyze data requirements needed to support the business processes within the scope of corresponding information systems in organizations. Therefore, the process of data modeling involves professional data modelers working closely with business stakeholders, as well as potential users of the information system.

> There are three different types of data models produced while progressing from requirements to the actual database to be used for the information system. The data requirements are initially recorded as a conceptual data model which is essentially a set of technology independent specifications about the data and is used to discuss initial requirements with the business stakeholders. The conceptual model is then translated into a logical data model, which documents structures of the data that can be implemented in databases. Implementation of one conceptual data model may require multiple logical data models. The last step in data modeling is transforming the logical data model to a physical data model that organizes the data into tables, and accounts for access, performance and storage details. Data modeling defines not just data elements, but also their structures and the relationships between them.

## Data Modeling Topics

[Data Modeling Topics](https://en.wikipedia.org/wiki/Data_modeling#Data_modeling_topics)

> Data models provide a framework for data to be used within information systems by providing specific definition and format. If a data model is used consistently across systems then compatibility of data can be achieved. If the same data structures are used to store and access data then different applications can share data seamlessly. The results of this are indicated in the diagram. However, systems and interfaces are often expensive to build, operate, and maintain. They may also constrain the business rather than support it. This may occur when the quality of the data models implemented in systems and interfaces is poor.

## Data Modeling Process 

> The process of designing a database involves producing the previously described three types of schemas - conceptual, logical, and physical. The database design documented in these schemas are converted through a Data Definition Language, which can then be used to generate a database. A fully attributed data model contains detailed attributes (descriptions) for every entity within it. The term "database design" can describe many different parts of the design of an overall database system. Principally, and most correctly, it can be thought of as the logical design of the base data structures used to store the data. In the relational model these are the tables and views. In an object database the entities and relationships map directly to object classes and named relationships. However, the term "database design" could also be used to apply to the overall process of designing, not just the base data structures, but also the forms and queries used as part of the overall database application within the Database Management System or DBMS.

#### Entity Relationship Diagrams

> There are several notations for data modeling. The actual model is frequently called "Entity relationship model", because it depicts data in terms of the entities and relationships described in the data. An entity-relationship model (ERM) is an abstract conceptual representation of structured data. Entity-relationship modeling is a relational schema database modeling method, used in software engineering to produce a type of conceptual data model (or semantic data model) of a system, often a relational database, and its requirements in a top-down fashion.

> Several techniques have been developed for the design of data models. While these methodologies guide data modelers in their work, two different people using the same methodology will often come up with very different results. Most notable are:

* Bachman diagrams

* Barker's notation

* Chen's Notation

* Data Vault Modeling

* Extended Backus–Naur form

* IDEF1X

* Object-relational mapping

* Object-Role Modeling

* Relational Model

* Relational Model/Tasmania

## Data Modeling Techniques Blog Post 

Please check out this [Ebay Data Modeling Blog Post](https://www.ebayinc.com/stories/blogs/tech/nosql-data-modeling/)

## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [Database Theory](./database-theory.md) | [Data Normalization](./data-normalization.md) →
