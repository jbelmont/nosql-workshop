"use strict";

const proc = require('child_process').spawn('pbcopy');
const faker = require("faker");

let articles = [];

for (let i = 0; i < 50; i++) {
    articles.push({
        subject: faker.company.companyName(),
        title: faker.company.catchPhrase()
    });
}

proc.stdin.write(JSON.stringify(articles));
proc.stdin.end();