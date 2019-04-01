"use strict";

const proc = require('child_process').spawn('pbcopy');
const faker = require("faker");

let sessions = [];

for (let i = 0; i < 50; i++) {
    sessions.push({
        user_id: faker.random.uuid(),
        ts: faker.date.past(),
        length: Math.floor(Math.random() * 100)
    });
}

proc.stdin.write(JSON.stringify(sessions));
proc.stdin.end();