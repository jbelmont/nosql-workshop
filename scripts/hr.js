"use strict";

var proc = require('child_process').spawn('pbcopy');
var faker = require("faker");

var employees = [];

var stat = ["Active", "InActive"];

for (var i = 0; i < 10; i++) {
    employees.push({
        employee: i+1,
        status: stat[Math.floor(Math.random() * 2)],
        employeeCard: faker.helpers.createCard()
    });
}

proc.stdin.write(JSON.stringify(employees));
proc.stdin.end();
