NoSQL Workshop - Mongo Shell

## Sections:

* [Configure the mongo Shell](#configure_the_mongo_shell)
* [Access the mongo Shell Help](access_the_mongo_shell_help)
* [Write Scripts for the mongo Shell](write_scripts_for_the_mongo_shell)
* [Data Types in the mongo Shell](data_types_in_the_mongo_shell)
* [mongo Shell Quick Reference](mongo_shell_quick_reference)
* [Bread Crumb Navigation](#bread-crumb-navigation)

**These information is all gleaned from the official [mongodb docs](https://docs.mongodb.com/manual/tutorial/access-mongo-shell-help/)**

#### Configure the mongo Shell

###### Customize the prompt 

We can easily customize the mongo shell:

![mongo prompt](../images/mongo_prompt.png)

We can also customize the mongo prompt to show more information with something like this:

```js
host = db.serverStatus().host;

prompt = function() {
    return db+"@"+host+"$ ";
}
```

![mongo prompt 2](../images/mongo_prompt2.png)

Let us try another mongo prompt example:

```js
prompt = function() {
    return "DB Uptime:"+db.serverStatus().uptime+" Documents:"+db.stats().objects+" > ";
}
```

![mongo prompt 3](../images/mongo_prompt3.png)

###### External Editor in Mongo shell

*We can configure an external editor like vim to the mongo shell.*

![external editor](../images/external-editor.png)

Here is a vim session with the *andOne* function we just defined:

![vim session](../images/vim-session.png)

We made some changes to the andOne function as you can tell when we print out the contents:

![changed function](../images/changed-func.png)

###### Changing the mongo shell batch size

We can directly change the default batch size by doing the following in the mongo shell:

```js
DBQuery.shellBatchSize = 15;
```

#### Access the mongo Shell Help

###### Command Line Help

You can see the full list of options and help items by invoking this command in your shell:

```bash
mongo --help
MongoDB shell version v4.0.5
usage: mongo [options] [db address] [file names (ending in .js)]
db address can be:
  foo                   foo database on local machine
  192.168.0.5/foo       foo database on 192.168.0.5 machine
  192.168.0.5:9999/foo  foo database on 192.168.0.5 machine on port 9999
Options:
  --shell                             run the shell after executing files
  --nodb                              don't connect to mongod on startup - no
                                      'db address' arg expected
  --norc                              will not run the ".mongorc.js" file on
                                      start up
  --quiet                             be less chatty
  --port arg                          port to connect to
  --host arg                          server to connect to
  --eval arg                          evaluate javascript
...................................................................
```

###### Shell Help

You can see all of the mongo shell *help* by typing *help* in mongo shell.

You can get to mongo shell in a couple of ways:

1. Run mongo daemon locally preferably with docker.

I have a mongo image with vim installed in it:

Pull my docker image with:

`docker pull jbelmont/mongo-vim:4.0.5`

Or you can pull the official mongo image in docker hub with:

`docker pull mongo:4.0.5`

Now you will need to run docker image once it is in your local machine.

I would suggest to create the following directory:

```bash
sudo mkdir -p /data/db

sudo chown -R jean-marcelbelmont:staff /data
```

The 2nd command should be your username and this is for a Mac OS X specifically.

The */data/db* directory is for [WiredTiger Storage Engine](https://docs.mongodb.com/manual/core/wiredtiger/) which is the default storage engine anyways.

Here is a script that will run my personal image:

```bash
#! /bin/bash

docker run --name jbelmont-mongo-image-4 \
  --rm \
  -v ~/mongod_data.4.0.5:/data/db \
  -p 27017:27017 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -d jbelmont/mongo-vim:4.0.5
```

Here is a command to run the official image:

```bash
docker run --name mongo-4 \
  --rm \
  -v ~/mongod_data.4.0.5:/data/db \
  -p 27017:27017 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -d jbelmont/mongo-vim:4.0.5
```

Now you can get an interactive mongo shell session a couple of ways:

1. You can directly enter running docker container with *docker exec* command
    1. If you run my personal docker image using the script above you can run the following command:
        1. `docker exec -it $(docker ps -a | awk '/mongo\-vim/ { print $1 }') /bin/bash`
    2. Else if you run the official docker image and execute the command I gave above
        1. `docker exec -it $(docker ps -a | awk '/mongo/ { print $1 }') /bin/bash`
    3. Else none of these commands work and you might have multiple mongo sessions running or something else.
        1. `docker ps -a | grep mongo` so find the right docker container id and copy it to system clipboard and run the exec command
        2. `docker exec -it SYSTEM-COPIED-process /bin/bash`

2. You can also run mongo directly like this:
    1. `mongo localhost:27017`
    2. This will connect to localhost and to port 27017 which is the default port.

*Once inside the mongo interactive shell run the following command:*

![mongo help](../images/mongo-help-command.png)

###### Database Help

###### To see the list of database on the mongodb server run the following command:

```bash
> show databases
admin           0.000GB
config          0.000GB
local           0.000GB
nosql_workshop  0.000GB
test            0.000GB
```

*Notice here that might have something different.*

You can run the alias form of:

`show dbs`

###### To see the list of help for methods you can use on the db object, call the db.help() method:

```bash
> db.help()
DB methods:
	db.adminCommand(nameOrDocument) - switches to 'admin' db, and runs command [just calls db.runCommand(...)]
	db.aggregate([pipeline], {options}) - performs a collectionless aggregation on this database; returns a cursor
	db.auth(username, password)
	db.cloneDatabase(fromhost) - deprecated
	db.commandHelp(name) returns the help for the command
	db.copyDatabase(fromdb, todb, fromhost) - deprecated
	db.createCollection(name, {size: ..., capped: ..., max: ...})
	db.createView(name, viewOn, [{$operator: {...}}, ...], {viewOptions})
	db.createUser(userDocument)
	db.currentOp() displays currently executing operations in the db
	db.dropDatabase()
	db.eval() - deprecated
	db.fsyncLock() flush data to disk and lock server for backups
	db.fsyncUnlock() unlocks server following a db.fsyncLock()
	db.getCollection(cname) same as db['cname'] or db.cname
	db.getCollectionInfos([filter]) - returns a list that contains the names and options of the db's collections
	db.getCollectionNames()
	db.getLastError() - just returns the err msg string
	db.getLastErrorObj() - return full status object
..........................................................................................
```

###### To see the implementation of a method in the shell, type the `db.<method name>` without the parenthesis `()`:

The following example will return the implementation of the method `db.dropDatabase()`:

```bash
> db.dropDatabase
function () {
    if (arguments.length)
        throw Error("dropDatabase doesn't take arguments");
    return this._dbCommand({dropDatabase: 1});
}
```

###### Collection Help

###### To see the list of collections in the current database, use the show collections command:

```bash
> use nosql_workshop
switched to db nosql_workshop
>
> show collections
inventory
json
numbers
people
```

Here we switch to nosql_workshop database and then run *show collections* command.

###### To see the help for methods available on the collection objects (e.g. db.<collection>), use the db.<collection>.help() method:

```bash
> db.numbers.help()
DBCollection help
	db.numbers.find().help() - show DBCursor help
	db.numbers.bulkWrite( operations, <optional params> ) - bulk execute write operations, optional parameters are: w, wtimeout, j
	db.numbers.count( query = {}, <optional params> ) - count the number of documents that matches the query, optional parameters are: limit, skip, hint, maxTimeMS
	db.numbers.countDocuments( query = {}, <optional params> ) - count the number of documents that matches the query, optional parameters are: limit, skip, hint, maxTimeMS
	db.numbers.estimatedDocumentCount( <optional params> ) - estimate the document count using collection metadata, optional parameters are: maxTimeMS
	db.numbers.copyTo(newColl) - duplicates collection by copying all documents to newColl; no indexes are copied.
	db.numbers.convertToCapped(maxBytes) - calls {convertToCapped:'numbers', size:maxBytes}} command
	db.numbers.createIndex(keypattern[,options])
	db.numbers.createIndexes([keypatterns], <options>)
	db.numbers.dataSize()
	db.numbers.deleteOne( filter, <optional params> ) - delete first matching document, optional parameters are: w, wtimeout, j
	db.numbers.deleteMany( filter, <optional params> ) - delete all matching documents, optional parameters are: w, wtimeout, j
	db.numbers.distinct( key, query, <optional params> ) - e.g. db.numbers.distinct( 'x' ), optional parameters are: maxTimeMS
	db.numbers.drop() drop the collection
	db.numbers.dropIndex(index) - e.g. db.numbers.dropIndex( "indexName" ) or db.numbers.dropIndex( { "indexKey" : 1 } )
	db.numbers.dropIndexes()
	db.numbers.ensureIndex(keypattern[,options]) - DEPRECATED, use createIndex() instead
	db.numbers.explain().help() - show explain help
	db.numbers.reIndex()
	db.numbers.find([query],[fields]) - query is an optional query filter. fields is optional set of fields to return.
	                                              e.g. db.numbers.find( {x:77} , {name:1, x:1} )
	db.numbers.find(...).count()
	db.numbers.find(...).limit(n)
...........................................................................................
```

> `<collection>` can be the name of a collection that exists, although you may specify a collection that doesn’t exist.

> To see the collection method implementation, type the `db.<collection>.<method>` name without the parenthesis `()`, as in the following example which will return the implementation of the find() method:

```bash
> db.numbers.find
function (query, fields, limit, skip, batchSize, options) {
    var cursor = new DBQuery(this._mongo,
                             this._db,
                             this,
                             this._fullName,
                             this._massageObject(query),
                             fields,
                             limit,
                             skip,
                             batchSize,
                             options || this.getQueryOptions());

    {
        const session = this.getDB().getSession();

        const readPreference = session._serverSession.client.getReadPreference(session);
        if (readPreference !== null) {
            cursor.readPref(readPreference.mode, readPreference.tags);
        }

        const readConcern = session._serverSession.client.getReadConcern(session);
        if (readConcern !== null) {
            cursor.readConcern(readConcern.level);
        }
    }

    return cursor;
}
```

###### Cursor Help

> When you perform read operations with the find() method in the mongo shell, you can use various cursor methods to modify the find() behavior and various JavaScript methods to handle the cursor returned from the find() method.

###### To list the available modifier and cursor handling methods, use the db.collection.find().help() command:

```bash
> db.numbers.find().help()
find(<predicate>, <projection>) modifiers
	.sort({...})
	.limit(<n>)
	.skip(<n>)
	.batchSize(<n>) - sets the number of docs to return per getMore
	.collation({...})
	.hint({...})
	.readConcern(<level>)
	.readPref(<mode>, <tagset>)
	.count(<applySkipLimit>) - total # of objects matching query. by default ignores skip,limit
	.size() - total # of objects cursor would return, honors skip,limit
	.explain(<verbosity>) - accepted verbosities are {'queryPlanner', 'executionStats', 'allPlansExecution'}
	.min({...})
	.max({...})
	.maxScan(<n>)
	.maxTimeMS(<n>)
	.comment(<comment>)
	.tailable(<isAwaitData>)
	.noCursorTimeout()
	.allowPartialResults()
	.returnKey()
	.showRecordId() - adds a $recordId field to each returned object

Cursor methods
	.toArray() - iterates through docs and returns an array of the results
	.forEach(<func>)
	.map(<func>)
	.hasNext()
	.next()
	.close()
	.objsLeftInBatch() - returns count of docs left in current batch (when exhausted, a new getMore will be issued)
	.itcount() - iterates through documents and counts them
	.pretty() - pretty print each document, possibly over multiple lines
>
```

> `<collection>` can be the name of a collection that exists, although you may specify a collection that doesn’t exist.

###### To see the implementation of the cursor method, type the db.<collection>.find().<method> name without the parenthesis (), as in the following example which will return the implementation of the toArray() method:

```bash
> db.collection.find().toArray
function () {
    if (this._arr)
        return this._arr;

    var a = [];
    while (this.hasNext())
        a.push(this.next());
    this._arr = a;
    return a;
}
```

*Some useful methods for handling cursors are:*

1. [`hasNext()`](https://docs.mongodb.com/manual/reference/method/cursor.hasNext/#cursor.hasNext)   
	
	1. hasNext checks whether the cursor has more documents to return.

2. [`next()`](https://docs.mongodb.com/manual/reference/method/cursor.next/#cursor.next)
    	
	1. next returns the next document and advances the cursor position forward by one.

3. [`forEach(<function>)`](https://docs.mongodb.com/manual/reference/method/cursor.forEach/#cursor.forEach) 
    	
	1. forEach iterates the whole cursor and applies the `<function>` to each document returned by the cursor. 
	2. The `<function>` expects a single argument which corresponds to the document from each iteration.

###### Wrapper Object Help

###### To get a list of the wrapper classes available in the mongo shell, such as ObjectId(), type help misc in the mongo shell:

```bash
> help misc
	b = new BinData(subtype,base64str)  create a BSON BinData value
	b.subtype()                         the BinData subtype (0..255)
	b.length()                          length of the BinData data in bytes
	b.hex()                             the data as a hex encoded string
	b.base64()                          the data as a base 64 encoded string
	b.toString()

	b = HexData(subtype,hexstr)         create a BSON BinData value from a hex string
	b = UUID(hexstr)                    create a BSON BinData value of UUID subtype
	b = MD5(hexstr)                     create a BSON BinData value of MD5 subtype
	"hexstr"                            string, sequence of hex characters (no 0x prefix)

	o = new ObjectId()                  create a new ObjectId
	o.getTimestamp()                    return timestamp derived from first 32 bits of the OID
	o.isObjectId
	o.toString()
	o.equals(otherid)

	d = ISODate()                       like Date() but behaves more intuitively when used
	d = ISODate('YYYY-MM-DD hh:mm:ss')    without an explicit "new " prefix on construction
> objectId = new ObjectId()
ObjectId("5c603570e97a475d5b92d7ac")
>
```

#### Write Scripts for the mongo Shell

#### Opening New Connections

From the mongo shell or from a JavaScript file, you can instantiate database connections using the `Mongo()` constructor:

```bash
db = new Mongo("localhost:27017").getDB("test")
test
```

Here we create a new local database connection to the test database.

> If connecting to a MongoDB instance that enforces access control, you can use the db.auth() method to authenticate.

> Additionally, you can use the connect() method to connect to the MongoDB instance.

```bash
db = connect("localhost:27017/test")
connecting to: mongodb://localhost:27017/test
Implicit session: session { "id" : UUID("11921e8f-706d-4b7e-9f09-fd70578846e6") }
MongoDB server version: 4.0.5
test
```

*The following example connects to the MongoDB instance to the test database that is running on localhost and sets the global db variable.*

#### Differences Between Interactive and Scripted mongo

[Differences Between Interactive and Script Mongo](https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/#differences-between-interactive-and-scripted-mongo)

> When writing scripts for the mongo shell, consider the following:

> To set the db global variable, use the getDB() method or the connect() method. You can assign the database reference to a variable other than db.

> Write operations in the mongo shell use a write concern of { w: 1 } by default. If performing bulk operations, use the Bulk() methods. See Write Method Acknowledgements for more information.

> You cannot use any shell helper (e.g. use `<dbname>`, show dbs, etc.) inside the JavaScript file because they are not valid JavaScript.

The following table maps the most common mongo shell helpers to their JavaScript equivalents.

| Shell Helpers | JavaScript Equivalents |
| --- | --- |
| show dbs, show databases | db.adminCommand('listDatabases') |
| use &lt;db&gt; | db = db.getSiblingDB('&lt;db&gt;') |
| show collections | db.getCollectionNames() |
| show users | db.getUsers() |
| show roles | db.getRoles({showBuiltinRoles: true}) |
| show log &lt;logname&gt; | db.adminCommand({ 'getLog' : '&lt;logname&gt;' }) |
| show logs | db.adminCommand({ 'getLog' : '*' }) |
| it | cursor = db.collection.find() if ( cursor.hasNext() ){cursor.next(); } | 

> In interactive mode, mongo prints the results of operations including the content of all cursors. In scripts, either use the JavaScript `print()` function or the mongo specific `printjson()` function which returns formatted JSON.

> To print all items in a result cursor in mongo shell scripts, use the following idiom:

```js
cursor = db.numbers.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}
```

#### Scripting

From the system prompt, use mongo to evaluate JavaScript.

![mongo eval javascript](../images/mongo-eval-js.png)

Notice that the screenshot show the collections that exist on the localhost/nosql_workshop connection on port 27017.

###### Executing a Javascript file on the mongo shell

You can specify a .js file to the mongo shell, and mongo will execute the JavaScript directly. Consider the following example:

![js file to execute](../images/mongo-shell-js.png)

> Alternately, you can specify the mongodb connection parameters inside of the javascript file using the `Mongo()` constructor.

*You can execute a .js file from within the mongo shell, using the load() function.*

```bash
load("scripts/show_collections.js")

show_collections script:

inventory,json,numbers,people
true
```

Here is the contents of the show_collections.js script:

```js
"use strict";

// equivalent for "use <db>" command in mongo shell
var db = db.getSiblingDB('nosql_workshop');
 
// print the collections present in nosql_workshop db
print("\nshow_collections script:\n")
print(db.getCollectionNames());
```

> The `load()` method accepts relative and absolute paths.

> There is no search path for the load() function. If the desired script is not in the current working directory or the full specified path, mongo will not be able to access the file.

#### Data Types in the mongo Shell

Content

#### mongo Shell Quick Reference

Content

#### Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [BSON Data Types](./bson-data-types.md) | [Mongo CRUD Operations](./mongo-crud-operations.md) →
