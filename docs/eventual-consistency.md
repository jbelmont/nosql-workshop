NoSQL Workshop - Eventual Consistency

## Sections:

* [Eventual Consistency Definition](https://en.wikipedia.org/wiki/Eventual_consistency)
* [Bread Crumb Navigation](#bread-crumb-navigation)

## Eventual Consistency

> Eventual consistency is a consistency model used in distributed computing to achieve high availability that informally guarantees that, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value. Eventual consistency, also called optimistic replication, is widely deployed in distributed systems, and has origins in early mobile computing projects. A system that has achieved eventual consistency is often said to have converged, or achieved replica convergence. Eventual consistency is a weak guarantee – most stronger models, like linearizability are trivially eventually consistent, but a system that is merely eventually consistent does not usually fulfill these stronger constraints.

> Eventually-consistent services are often classified as providing BASE (Basically Available, Soft state, Eventual consistency) semantics, in contrast to traditional ACID (Atomicity, Consistency, Isolation, Durability) guarantees. Eventual consistency is sometimes criticized as increasing the complexity of distributed software applications. This is partly because eventual consistency is purely a liveness guarantee (reads eventually return the same value) and does not make safety guarantees: an eventually consistent system can return any value before it converges.

*Please read the [Consistency Model Wikipedia Post for more in-depth information about consistency models.](https://en.wikipedia.org/wiki/Consistency_model)*

## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [CAP Thereom](./cap.md) | [NoSQL Databases](./nosql-databases.md) →
