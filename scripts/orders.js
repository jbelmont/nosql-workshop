"use strict";

var proc = require('child_process').spawn('pbcopy');
// Load Chance
var Chance = require('chance');
// Load faker
var faker = require("faker");

// Instantiate Chance so it can be used
var chance = new Chance();

var orders = [];

var status = ["A", "B", "C", "D", "E", "G"];

for (var i = 0; i < 50; i++) {
    orders.push({
        cust_id: chance.fbid(),
        amount: faker.finance.amount(),
        status: status[Math.floor(Math.random() * 5)]
    });
}

proc.stdin.write(JSON.stringify(orders));
proc.stdin.end();
