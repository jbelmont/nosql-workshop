"use strict";

var proc = require('child_process').spawn('pbcopy');
var faker = require("faker");

var sessions = [];

for (var i = 0; i < 50; i++) {
    sessions.push({
        user_id: faker.random.uuid(),
        ts: faker.date.past(),
        length: Math.floor(Math.random() * 100)
    });
}

proc.stdin.write(JSON.stringify(sessions));
proc.stdin.end();
