"use strict";

const proc = require('child_process').spawn('pbcopy');
const faker = require("faker");

let geospatialDocs = [];

for (let i = 0; i < 50; i++) {
    geospatialDocs.push({
        name: faker.address.streetAddress(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude()
    });
}

proc.stdin.write(JSON.stringify(geospatialDocs));
proc.stdin.end();