"use strict";

var db = connect("localhost:27017/nosql_workshop");

var inventory = [
    {"item":"Generic Frozen Keyboard","type":"Electronics","quantity":79},{"item":"Incredible Frozen Mouse","type":"Electronics","quantity":23},{"item":"Handmade Granite Chips","type":"Games","quantity":14},{"item":"Rustic Fresh Ball","type":"Games","quantity":92},{"item":"Intelligent Fresh Chips","type":"Toys","quantity":55},{"item":"Generic Frozen Tuna","type":"Outdoors","quantity":29},{"item":"Handmade Cotton Cheese","type":"Books","quantity":28},{"item":"Licensed Metal Chips","type":"Automotive","quantity":41},{"item":"Sleek Granite Cheese","type":"Outdoors","quantity":91},{"item":"Ergonomic Fresh Shirt","type":"Music","quantity":86},{"item":"Generic Concrete Hat","type":"Movies","quantity":87},{"item":"Refined Cotton Mouse","type":"Toys","quantity":65},{"item":"Practical Concrete Keyboard","type":"Electronics","quantity":1},{"item":"Practical Cotton Ball","type":"Kids","quantity":70},{"item":"Ergonomic Cotton Cheese","type":"Kids","quantity":38},{"item":"Practical Granite Shirt","type":"Shoes","quantity":19},{"item":"Practical Wooden Shoes","type":"Kids","quantity":40},{"item":"Small Granite Ball","type":"Shoes","quantity":16},{"item":"Handcrafted Wooden Pants","type":"Baby","quantity":31},{"item":"Gorgeous Rubber Fish","type":"Electronics","quantity":3},{"item":"Licensed Cotton Towels","type":"Music","quantity":48},{"item":"Rustic Cotton Pants","type":"Games","quantity":68},{"item":"Gorgeous Steel Mouse","type":"Computers","quantity":96},{"item":"Practical Concrete Gloves","type":"Baby","quantity":48},{"item":"Unbranded Plastic Table","type":"Baby","quantity":32},{"item":"Ergonomic Plastic Pizza","type":"Automotive","quantity":75},{"item":"Awesome Concrete Bike","type":"Tools","quantity":29},{"item":"Unbranded Metal Ball","type":"Automotive","quantity":10},{"item":"Fantastic Soft Pizza","type":"Automotive","quantity":68},{"item":"Handcrafted Cotton Hat","type":"Shoes","quantity":35},{"item":"Unbranded Fresh Chips","type":"Beauty","quantity":20},{"item":"Small Wooden Computer","type":"Automotive","quantity":4},{"item":"Incredible Steel Gloves","type":"Music","quantity":17},{"item":"Generic Plastic Chips","type":"Jewelery","quantity":72},{"item":"Fantastic Soft Gloves","type":"Shoes","quantity":80},{"item":"Rustic Plastic Table","type":"Books","quantity":42},{"item":"Handmade Cotton Chicken","type":"Shoes","quantity":97},{"item":"Ergonomic Soft Chicken","type":"Health","quantity":85},{"item":"Licensed Concrete Chicken","type":"Garden","quantity":94},{"item":"Handcrafted Granite Bacon","type":"Clothing","quantity":83},{"item":"Intelligent Fresh Pizza","type":"Computers","quantity":93},{"item":"Incredible Fresh Fish","type":"Movies","quantity":92},{"item":"Handmade Concrete Computer","type":"Outdoors","quantity":48},{"item":"Licensed Steel Towels","type":"Clothing","quantity":24},{"item":"Tasty Steel Chicken","type":"Grocery","quantity":4},{"item":"Awesome Plastic Pizza","type":"Home","quantity":2},{"item":"Handcrafted Wooden Bike","type":"Kids","quantity":85},{"item":"Intelligent Fresh Mouse","type":"Electronics","quantity":39},{"item":"Tasty Steel Keyboard","type":"Automotive","quantity":92},{"item":"Tasty Frozen Gloves","type":"Computers","quantity":71}
];

for (var i = 0; i < 50; i ++) {
    db.inventory.insertOne({
        _id: new ObjectId(),
        item: inventory[i].item,
        type: inventory[i].type,
        quantity: inventory[i].quantity
    });
}

db.inventory.createIndex({ quantity: 1, type: 1 });
db.inventory.createIndex({ type: 1, quantity: 1 });
