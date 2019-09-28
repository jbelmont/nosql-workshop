"use strict";

var proc = require('child_process').spawn('pbcopy');
var faker = require("faker");

var products = [];

for (var i = 0; i < 50; i++) {
    var category = [faker.commerce.department(),faker.commerce.department(),faker.commerce.department()];
    products.push({
        item: faker.commerce.productName(),
        category: category,
        location: faker.address.streetAddress(),
        stock: Math.floor(Math.random() * 100),
        type: faker.commerce.product()
    });
}

proc.stdin.write(JSON.stringify(products));
proc.stdin.end();
