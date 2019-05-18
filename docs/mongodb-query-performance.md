NoSQL Workshop - Mongo Query Performance

## Sections:

* [MongoDB Profiler](#mongodb-profiler)
* [Bread Crumb Navigation](#bread-crumb-navigation)

The information below comes from [Analyzing MongoDB Performance](https://docs.mongodb.com/manual/administration/analyzing-mongodb-performance/)

## MongoDB Profiler

Just remember that the database system will decides how to do the operation and what physical operations to need to be performed.

MongoDB comes with a built-in profiler that gives query-level insight as to why the database chose these operations.

The MongoDB profiler lets you see what queries are being run

Either by collecting all of the queries or by sampling time-slices of the queries.

Normally you will leave the profiler off unless you need to monitor usage of a database and need to collect information.

When MongoDB collects queries, it use the entire database instance, which means all your databases and connections on that instance will collect data. 

Profiling can be turned on or off from applications or from the mongo shell.

#### Configuring the MongoDB Profiler

The MongoDB profiler stores queries in the following database and colection: "db.system.profile". 

This system database can be queried just like any other database and you can find a lot of information quickly from this database

The following information will be stored in the profile collection:

* The query and/or command
* when the query was run
* how fast the query ran
* The number of documents that were examined
* The type of plan that was used
* Whether an index was able to be used
* The type of locking that occurred

The current profiling status can be found with:

```bash
db.getProfilingStatus()
{ "was" : 0, "slowms" : 100, "sampleRate" : 1 }
```

* The `was` field reports what the verbosity level is set to.
* The `slowms` field reports the queries that are stored based on the time it takes for the query to complete which in this case is longer than 100ms
* The `sample` field is the fraction of slow operations that should be profiled or logged.  
    * sampleRate accepts values between 0 and 1, inclusive.

###### Setting the MongoDB Profiler

The following numeric values can be set for the profiler:

* Level 0 
    * The profiler is off and does not collect any data. This is the default profiler level.

* Level 1
    * The profiler collects data for operations that take longer than the value of slowms, which you can set.

* Level 2 
    * The profiler collects data for all operations regardless of the `slowms` field value set.

```bash
db.setProfilingLevel(2)
{ "was" : 0, "slowms" : 100, "sampleRate" : 1, "ok" : 1 }
> db.setProfilingLevel(0)
{ "was" : 2, "slowms" : 100, "sampleRate" : 1, "ok" : 1 }
```

Notice we set the profiling state back to the default profiler level of 0.

We can also view the new profiling level with:

```bash
> db.getProfilingStatus()
{ "was" : 0, "slowms" : 100, "sampleRate" : 1 }
```

## Useful Queries/Scripts for Performance Tuning

#### Sort queries by when queries are recorded and show just commands/aggregations etc

```js
"use strict";

var db = connect("localhost:27017/nosql_workshop");

// This is good for aggregate queries
db.system.profile.find({
    "command.pipeline": { $exists: true }
},{
    "command.pipeline":1
}).sort({
    $natural:-1
}).pretty();
```

#### Find all queries that execute a COLLSCAN (Collection Scan) because there is no suitable index used

Please perform the following query in the largev2 collection:

```bash
db.largev2.find( { word: { $regex: /^ab.*/, $options: "si" } } )
```

This will look for all documents that have the word field that have characters starting with "ab"

Next do the following query in the system database and profile collection:

```bash
db.system.profile.find({"planSummary":{$eq:"COLLSCAN"}, "op" : {$eq:"query"}}).sort({millis:-1})
{
	"op" : "query",
	"ns" : "nosql_workshop.largev2",
	"command" : {
		"find" : "largev2",
		"filter" : {
			"word" : {
				"$regex" : /^ab.*/,
				"$options" : "si"
			}
		},
		"lsid" : {
			"id" : UUID("9351612c-8d7e-446b-a92d-e31817068d25")
		},
		"$db" : "nosql_workshop"
	},
	"cursorid" : 60943904003,
	"keysExamined" : 0,
	"docsExamined" : 26909,
	"numYield" : 210,
	"nreturned" : 101,
	"locks" : {
		"Global" : {
			"acquireCount" : {
				"r" : NumberLong(211)
			}
		},
		"Database" : {
			"acquireCount" : {
				"r" : NumberLong(211)
			}
		},
		"Collection" : {
			"acquireCount" : {
				"r" : NumberLong(211)
			}
		}
	},
	"responseLength" : 6970,
	"protocol" : "op_msg",
	"millis" : 20,
	"planSummary" : "COLLSCAN",
	"execStats" : {
		"stage" : "COLLSCAN",
		"filter" : {
			"word" : {
				"$regex" : "^ab.*",
				"$options" : "si"
			}
		},
		"nReturned" : 101,
		"executionTimeMillisEstimate" : 10,
		"works" : 26910,
		"advanced" : 101,
		"needTime" : 26809,
		"needYield" : 0,
		"saveState" : 211,
		"restoreState" : 210,
		"isEOF" : 0,
		"invalidates" : 0,
		"direction" : "forward",
		"docsExamined" : 26909
	},
	"ts" : ISODate("2019-05-18T17:57:54.389Z"),
	"client" : "172.17.0.1",
	"appName" : "MongoDB Shell",
	"allUsers" : [ ],
	"user" : ""
}
......................................................................
```

*We will get profile data such as the output shown above!*

## Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:

Section to come
