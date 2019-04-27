"use strict";

var proc = require('child_process').spawn('pbcopy');
var faker = require("faker");

var articles = [];

for (var i = 0; i < 50; i++) {
    articles.push({
        subject: faker.company.companyName(),
        title: faker.company.catchPhrase()
    });
}

proc.stdin.write(JSON.stringify(articles));
proc.stdin.end();
