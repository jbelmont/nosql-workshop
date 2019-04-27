"use strict";

var proc = require('child_process').spawn('pbcopy');
var faker = require("faker");

var inventory = [];

for (var i = 0; i < 50; i++) {
    inventory.push({
        item: faker.commerce.productName(),
        type: faker.commerce.department(),
        quantity: Math.floor(Math.random() * 100)
    });
}

proc.stdin.write(JSON.stringify(inventory));
proc.stdin.end();
