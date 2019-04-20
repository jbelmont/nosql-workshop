NoSQL Workshop - ACID

## Sections:

* [ACID Computer Science Definition](#acid-computer-science-definition)
* [4 Characteristics of ACID](#4-characteristics-of-acid)
* [Implementing ACID Properties](#implementing-acid-properties)
* [Bread Crumb Navigation](#bread-crumb-navigation)

## ACID Computer Science Definition 

[ACID Computer Science Definition](https://en.wikipedia.org/wiki/ACID_%28computer_science%29)

In computer science, ACID (Atomicity, Consistency, Isolation, Durability) is a set of properties of database transactions intended to guarantee validity even in the event of errors, power failures, etc. In the context of databases, a sequence of database operations that satisfies the ACID properties (and these can be perceived as a single logical operation on the data) is called a transaction. For example, a transfer of funds from one bank account to another, even involving multiple changes such as debiting one account and crediting another, is a single transaction.

> In 1983, Andreas Reuter and Theo Härder coined the acronym ACID as shorthand for Atomicity, Consistency, Isolation, and Durability, building on earlier work by Jim Gray who enumerated Atomicity, Consistency, and Durability but left out Isolation when characterizing the transaction concept. These four properties describe the major guarantees of the transaction paradigm, which has influenced many aspects of development in database systems.

## 4 Characteristics of ACID 

The characteristics of these four properties as defined by Reuter and Härder are as follows:

#### Atomicity

[Atomicity (database systems)](https://en.wikipedia.org/wiki/Atomicity_(database_systems))

> Transactions are often composed of multiple statements. Atomicity guarantees that each transaction is treated as a single "unit", which either succeeds completely, or fails completely: if any of the statements constituting a transaction fails to complete, the entire transaction fails and the database is left unchanged. An atomic system must guarantee atomicity in each and every situation, including power failures, errors and crashes.

#### Consistency

[Consistency (database systems)](https://en.wikipedia.org/wiki/Consistency_(database_systems))

> Consistency ensures that a transaction can only bring the database from one valid state to another, maintaining database invariants: any data written to the database must be valid according to all defined rules, including constraints, cascades, triggers, and any combination thereof. This prevents database corruption by an illegal transaction, but does not guarantee that a transaction is correct.

#### Isolation

[Isolation (database systems)](https://en.wikipedia.org/wiki/Isolation_(database_systems))

> Transactions are often executed concurrently (e.g., reading and writing to multiple tables at the same time). Isolation ensures that concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially. Isolation is the main goal of concurrency control; depending on the method used, the effects of an incomplete transaction might not even be visible to other transactions.

#### Durability

[Durability (database systems)](https://en.wikipedia.org/wiki/Durability_(database_systems))

> Durability guarantees that once a transaction has been committed, it will remain committed even in the case of a system failure (e.g., power outage or crash). This usually means that completed transactions (or their effects) are recorded in non-volatile memory.

#### Implementing ACID Properties

[Implementation ACID](https://en.wikipedia.org/wiki/ACID_%28computer_science%29#Implementation)

> Processing a transaction often requires a sequence of operations that is subject to failure for a number of reasons. For instance, the system may have no room left on its disk drives, or it may have used up its allocated CPU time. There are two popular families of techniques: write-ahead logging and shadow paging. In both cases, locks must be acquired on all information to be updated, and depending on the level of isolation, possibly on all data that may be read as well. In write ahead logging, atomicity is guaranteed by copying the original (unchanged) data to a log before changing the database. That allows the database to return to a consistent state in the event of a crash. In shadowing, updates are applied to a partial copy of the database, and the new copy is activated when the transaction commits.

#### Locking vs Multiversioning

[Locking vs Multiversioning](https://en.wikipedia.org/wiki/ACID_%28computer_science%29#Locking_vs_multiversioning)

> Many databases rely upon locking to provide ACID capabilities. Locking means that the transaction marks the data that it accesses so that the DBMS knows not to allow other transactions to modify it until the first transaction succeeds or fails. The lock must always be acquired before processing data, including data that is read but not modified. Non-trivial transactions typically require a large number of locks, resulting in substantial overhead as well as blocking other transactions. For example, if user A is running a transaction that has to read a row of data that user B wants to modify, user B must wait until user A's transaction completes. Two phase locking is often applied to guarantee full isolation.

> An alternative to locking is multiversion concurrency control, in which the database provides each reading transaction the prior, unmodified version of data that is being modified by another active transaction. This allows readers to operate without acquiring locks, i.e., writing transactions do not block reading transactions, and readers do not block writers. Going back to the example, when user A's transaction requests data that user B is modifying, the database provides A with the version of that data that existed when user B started his transaction. User A gets a consistent view of the database even if other users are changing data. One implementation, namely snapshot isolation, relaxes the isolation property.

#### Distributed Transactions

[Distributed Transactions](https://en.wikipedia.org/wiki/ACID_(computer_science)#Distributed_transactions)

> Guaranteeing ACID properties in a distributed transaction across a distributed database, where no single node is responsible for all data affecting a transaction, presents additional complications. Network connections might fail, or one node might successfully complete its part of the transaction and then be required to roll back its changes because of a failure on another node. The two-phase commit protocol (not to be confused with two-phase locking) provides atomicity for distributed transactions to ensure that each participant in the transaction agrees on whether the transaction should be committed or not. Briefly, in the first phase, one node (the coordinator) interrogates the other nodes (the participants) and only when all reply that they are prepared does the coordinator, in the second phase, formalize the transaction.

*Please read the [Two-phase commit protocol Wikipedia Post](https://en.wikipedia.org/wiki/Two-phase_commit_protocol)*

## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [Database Normalization](./data-normalization.md) | [CAP Thereom](./cap.md) →
