NoSQL Workshop - BSON Specification

## Sections:

* [General Description](#general-description)
* [Basic Types](#basic-types)
* [Non-terminals](#non\-terminals)
* [Notes Section](#notes-section)
* [Bread Crumb Navigation](#bread-crumb-navigation)

All Information gleaned from official [bson specification](http://bsonspec.org/spec.html)

## General Description

> BSON is a binary format in which zero or more ordered key/value pairs are stored as a single entity. We call this entity a document.

> The following grammar specifies version 1.1 of the BSON standard. We've written the grammar using a pseudo-BNF syntax. Valid BSON data is represented by the document non-terminal.

#### Basic Types

> The following basic types are used as terminals in the rest of the grammar.

> Each type must be serialized in little-endian format.

| Type | Description |
| --- | --- |
| byte | 1 byte (8-bits) |
| int32 | 4 bytes (32-bit signed integer, two's complement) |
| int64 | 8 bytes (64-bit signed integer, two's complement) |
| uint64 | 8 bytes (64-bit unsigned integer) |
| double | 8 bytes (64-bit IEEE 754-2008 binary floating point) |
| decimal128 | 16 bytes (128-bit IEEE 754-2008 decimal floating point) |

#### Non-terminals

> The following specifies the rest of the BSON grammar. Note that quoted strings represent terminals, and should be interpreted with C semantics (e.g. "\x01" represents the byte 0000 0001). Also note that we use the * operator as shorthand for repetition (e.g. ("\x01"*2) is "\x01\x01"). When used as a unary operator, * means that the repetition can occur 0 or more times.

`<expr> ::= <term>|<expr><addop><term>`

###### Backus-Naur Form (BNF)

`<symbol> ::= __expression__`

Remember that in BNF Form the pipe (|) stands for an or operation.

document	&#58;&#58;&#61;	int32 e_list "\x00"	BSON Document. int32 is the total number of bytes comprising the document.

e_list	&#58;&#58;&#61;	element e_list
        &#124;	""

element	&#58;&#58;&#61;	"\x01" e_name   double	        64-bit binary floating point
        &#124;	"\x02" e_name   string	        UTF-8 string
        &#124;	"\x03" e_name   document	    Embedded document
        &#124;	"\x04" e_name   document	    Array
        &#124;	"\x05" e_name   binary	        Binary data
        &#124;	"\x06" e_name   Undefined (value) — Deprecated
        &#124;	"\x07" e_name   (byte*12)	    ObjectId
        &#124;	"\x08" e_name   "\x00"	        Boolean "false"
        &#124;	"\x08" e_name   "\x01"	        Boolean "true"
        &#124;	"\x09" e_name   int64	UTC     datetime
        &#124;	"\x0A" e_name   Null            value
        &#124;	"\x0B" e_name   cstring         cstring	    Regular expression - The first cstring is the regex pattern, the second is the regex options string. Options are identified by characters, which must be stored in alphabetical order. Valid options are 'i' for case insensitive matching, 'm' for multiline matching, 'x' for verbose mode, 'l' to make \w, \W, etc. locale dependent, 's' for dotall mode ('.' matches everything), and 'u' to make \w, \W, etc. match unicode.
        &#124;	"\x0C" e_name string (byte*12)	DBPointer — Deprecated
        &#124;	"\x0D" e_name string	        JavaScript code
        &#124;	"\x0E" e_name string	        Symbol. Deprecated
        &#124;	"\x0F" e_name code_w_s	        JavaScript code w/ scope
        &#124;	"\x10" e_name int32	            32-bit integer
        &#124;	"\x11" e_name uint64	        Timestamp
        &#124;	"\x12" e_name int64	            64-bit integer
        &#124;	"\x13" e_name decimal128	    128-bit decimal floating point
        &#124;	"\xFF" e_name Min key
        &#124;	"\x7F" e_name Max key

*Here an element is defined as double or a string, or a document, etc*

e_name	&#58;&#58;&#61;	cstring	Key name

string	&#58;&#58;&#61;	int32 (byte*) "\x00"	String - The int32 is the number bytes in the (byte*) + 1 (for the trailing '\x00'). The (byte*) is zero or more UTF-8 encoded characters.

cstring	&#58;&#58;&#61;	(byte*) "\x00"	Zero or more modified UTF-8 encoded characters followed by '\x00'. The (byte*) MUST NOT contain '\x00', hence it is not full UTF-8.

binary	&#58;&#58;&#61;	int32 subtype (byte*)	Binary - The int32 is the number of bytes in the (byte*).

subtype	&#58;&#58;&#61;	"\x00"	Generic binary subtype
    &#124;	"\x01"	Function
    &#124;	"\x02"	Binary (Old)
    &#124;	"\x03"	UUID (Old)
    &#124;	"\x04"	UUID
    &#124;	"\x05"	MD5
    &#124;	"\x80"	User defined

code_w_s	&#58;&#58;&#61;	int32 string document	Code w/ scope

#### Notes Section

* Array - The document for an array is a normal BSON document with integer values for the keys, starting with 0 and continuing sequentially. 
    * For example, the array ['red', 'blue'] would be encoded as the document {'0': 'red', '1': 'blue'}. The keys must be in ascending numerical order.

* UTC datetime - The int64 is UTC milliseconds since the Unix epoch.

* Timestamp - Special internal type used by MongoDB replication and sharding. 
    * First 4 bytes are an increment, second 4 are a timestamp.

* Min key - Special type which compares lower than all other possible BSON element values.

* Max key - Special type which compares higher than all other possible BSON element values.

* Generic binary subtype - This is the most commonly used binary subtype and should be the 'default' for drivers and tools.

* The BSON "binary" or "BinData" datatype is used to represent arrays of bytes. It is somewhat analogous to the Java notion of a ByteArray. 
    * BSON binary values have a subtype. This is used to indicate what kind of data is in the byte array. Subtypes from zero to 127 are predefined or reserved. Subtypes from 128-255 are user-defined.

    * \x02 Binary (Old) - This used to be the default subtype, but was deprecated in favor of 
    
    * \x00. Drivers and tools should be sure to handle \x02 appropriately. The structure of the binary data (the byte* array in the binary non-terminal) must be an int32 followed by a (byte*). The int32 is the number of bytes in the repetition.
    
    * \x03 UUID (Old) - This used to be the UUID subtype, but was deprecated in favor of \x04. Drivers and tools for languages with a native UUID type should handle \x03 appropriately.
    
    * \x80-\xFF "User defined" subtypes. The binary data can be anything.
    
* Code w/ scope - The int32 is the length in bytes of the entire code_w_s value. 
    * The string is JavaScript code. 
    * The document is a mapping from identifiers to values, representing the scope in which the string should be evaluated.


#### Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [MongoDB](./mongodb.md) | [BSON Data Types](./bson-data-types.md) →
