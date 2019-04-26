NoSQL Workshop - Graph Database

## Sections:

* [Definition of a Graph Database](#definition-of-a-graph-database)
* [Graphs in Computer Science](#graphs-in-computer-science)
* [List of Graph Databases](#list-of-graph-databases)
* [Bread Crumb Navigation](#bread-crumb-navigation)

## Definition of a Graph Database

> In computing, a graph database (GDB) is a database that uses graph structures for semantic queries with nodes, edges and properties to represent and store data. A key concept of the system is the graph (or edge or relationship), which directly relates data items in the store a collection of nodes of data and edges representing the relationships between the nodes. The relationships allow data in the store to be linked together directly, and in many cases retrieved with one operation. Graph databases hold the relationships between data as a priority. Querying relationships within a graph database is fast because they are perpetually stored within the database itself. Relationships can be intuitively visualized using graph databases, making it useful for heavily inter-connected data.

> Graph databases are part of the NoSQL databases created to address the limitations of the existing relational databases. While the graph model explicitly lays out the dependencies between nodes of data, the relational model and other NoSQL database models link the data by implicit connections. Graph databases, by design, allow simple and fast retrieval[citation needed] of complex hierarchical structures that are difficult to model[according to whom?] in relational systems. Graph databases are similar to 1970s network model databases in that both represent general graphs, but network-model databases operate at a lower level of abstraction and lack easy traversal over a chain of edges.

> The underlying storage mechanism of graph databases can vary. Some depend on a relational engine and “store” the graph data in a table (although a table is a logical element, therefore this approach imposes another level of abstraction between the graph database, the graph database management system and the physical devices where the data is actually stored). Others use a key-value store or document-oriented database for storage, making them inherently NoSQL structures. Most[according to whom?] graph databases based on non-relational storage engines also add the concept of tags or properties, which are essentially relationships having a pointer to another document. This allows data elements to be categorized for easy retrieval en masse.

> Retrieving data from a graph database requires a query language other than SQL, which was designed for the manipulation of data in a relational system and therefore cannot “elegantly” handle traversing a graph. As of 2017, no single graph query language has been universally adopted in the same way as SQL was for relational databases, and there are a wide variety of systems, most often tightly tied to one product. Some standardization efforts have occurred, leading to multi-vendor query languages like Gremlin, SPARQL, and Cypher. In addition to having query language interfaces, some graph databases are accessed through application programming interfaces (APIs).

> Graph databases differ from graph compute engines. Graph databases are technologies that are translations of the relational OLTP databases. On the other hand, graph compute engines are utilized in OLAP for bulk analysis. Graph databases have attracted considerable attention in the 2000s, due to the successes of major technology corporations in using proprietary graph databases, and the introduction of open-source graph databases.

## Graphs in Computer Science

Please check out the [Wikipedia post on Graphs](https://en.wikipedia.org/wiki/Graph_database#Graph)

## List of Graph Databases

*Please check out the following [Wikipedia Table on Graph Databases](https://en.wikipedia.org/wiki/Graph_database#List_of_graph_databases)*

## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [Document Database](./document-database.md) | [MongoDB](./mongodb.md) →
