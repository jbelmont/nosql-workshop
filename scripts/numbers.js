"use strict";

var proc = require('child_process').spawn('pbcopy');

var numbers = [];

// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

for (var i = 0; i < 1000; i++) {
    numbers.push({
        random: chance.floating({ min: 0, max: 1000, fixed: 2 }),
        count: i + 1
    });
}

proc.stdin.write(JSON.stringify(numbers));
proc.stdin.end();
