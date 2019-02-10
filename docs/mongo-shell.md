NoSQL Workshop - Mongo Shell

## Sections:

* [Configure the mongo Shell](#configure_the_mongo_shell)
* [Access the mongo Shell Help](access_the_mongo_shell_help)
* [Write Scripts for the mongo Shell](write_scripts_for_the_mongo_shell)
* [Data Types in the mongo Shell](data_types_in_the_mongo_shell)
* [mongo Shell Quick Reference](mongo_shell_quick_reference)
* [Bread Crumb Navigation](#bread-crumb-navigation)

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

Content

#### Write Scripts for the mongo Shell

Content

#### Data Types in the mongo Shell

Content

#### mongo Shell Quick Reference

Content

#### Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [BSON Data Types](./bson-data-types.md) | [Mongo CRUD Operations](./mongo-crud-operations.md) →
