"use strict";

const proc = require('child_process').spawn('pbcopy');
// Load Chance
let Chance = require('chance');
// Load faker
const faker = require("faker");

// Instantiate Chance so it can be used
let chance = new Chance();

let orders = [];

const status = ["A", "B", "C", "D", "E", "G"];

for (let i = 0; i < 50; i++) {
    orders.push({
        cust_id: chance.fbid(),
        amount: faker.finance.amount(),
        status: status[Math.floor(Math.random() * 5)]
    });
}

proc.stdin.write(JSON.stringify(orders));
proc.stdin.end();