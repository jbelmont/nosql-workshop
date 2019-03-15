"use strict";

let db = connect("localhost:27017/nosql_workshop");

let products = [
    {
      _id: 1,
      sku: "xyz123",
      description: "hats",
      available: [ { quantity: 25, size: "S" }, { quantity: 50, size: "M" } ],
      _dummy_field: 0
    },
    {
      _id: 2,
      sku: "abc123",
      description: "socks",
      available: [ { quantity: 10, size: "L" } ],
      _dummy_field: 0
    },
    {
      _id: 3,
      sku: "ijk123",
      description: "t-shirts",
      available: [ { quantity: 30, size: "M" }, { quantity: 5, size: "L" } ],
      _dummy_field: 0
    }
];

db.products.insertMany(products);

db.products.createIndex({ sku: 1 }, { unique: true });