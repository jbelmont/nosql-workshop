NoSQL Workshop - CAP Thereom

## Sections:

* [CAP Theorem Definition](#cap-thereom-definition)
* [Bread Crumb Navigation](#bread-crumb-navigation)

## CAP Theorem Definition

> In theoretical computer science, the CAP theorem, also named Brewer's theorem after computer scientist Eric Brewer, states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees:

* Consistency: Every read receives the most recent write or an error

* Availability: Every request receives a (non-error) response – without the guarantee that it contains the most recent write

* Partition tolerance: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes

> In particular, the CAP theorem implies that in the presence of a network partition, one has to choose between consistency and availability. Note that consistency as defined in the CAP theorem is quite different from the consistency guaranteed in ACID database transactions.

*Here is a good blog post on the [CAP Theorem](https://mwhittaker.github.io/blog/an_illustrated_proof_of_the_cap_theorem/)*

## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [ACID](./acid.md) | [Eventual Consistency](./eventual-consistency.md) →
