"use strict";

const proc = require('child_process').spawn('pbcopy');
const faker = require("faker");

let records = [];

for (let i = 0; i < 50; i++) {
    records.push({
        score: faker.random.number(),
        location: {
            state: faker.address.state(),
            city: faker.address.city()
        }
    });
}

proc.stdin.write(JSON.stringify(records));
proc.stdin.end();