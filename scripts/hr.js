"use strict";

const proc = require('child_process').spawn('pbcopy');
const faker = require("faker");

let employees = [];

let stat = ["Active", "InActive"];

for (let i = 0; i < 10; i++) {
    employees.push({
        employee: i+1,
        status: stat[Math.floor(Math.random() * 2)],
        employeeCard: faker.helpers.createCard()
    });
}

proc.stdin.write(JSON.stringify(employees));
proc.stdin.end();