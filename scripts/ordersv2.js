"use strict";

const proc = require('child_process').spawn('pbcopy');
// Load Chance
let Chance = require('chance');
// Load faker
const faker = require("faker");

// Instantiate Chance so it can be used
let chance = new Chance();

let ordersv2 = [];

const status = ["A", "B", "C", "D", "E", "G"];

let items = [
    { sku: "mmm", qty: 5, price: 2.5 },
    { sku: "nnn", qty: 5, price: 2.5 },
    { sku: 'ppp', qty: 7, price: 3.5 },
    { sku: 'abc', qty: 8, price: 4.5 },
    { sku: 'zzz', qty: 5, price: 2.75 },
    { sku: 'ooo', qty: 6, price: 2.8 },
    { sku: 'vvv', qty: 7, price: 3.5 },
    { sku: 'aaa', qty: 2, price: 4.55 },
    { sku: 'bbb', qty: 3, price: 2.55 },
    { sku: 'ccc', qty: 8.5, price: 9.25 }
];

let cust_ids = [];
let chance_id = chance.fbid();
for (let i = 0; i < 100; i++) {
    if (i % 5 === 0) {
        cust_ids.push(chance_id);
    } else {
        cust_ids.push(chance.fbid());
    }
}

for (let i = 0; i < 100; i++) {
    let orderDate = new Date(faker.date.past());
    let month = (orderDate.getMonth() + 1).toString().length === 1 ? `0${orderDate.getMonth() + 1}` : (orderDate.getMonth() + 1);
    let day = (orderDate.getDate() + 1).toString().length === 1 ? `0${orderDate.getDate()}` : (orderDate.getDate() + 1);
    orderDate = `${orderDate.getFullYear()}-${(month)}-${day}`;
    ordersv2.push({
        cust_id: cust_ids[i],
        amount: faker.finance.amount(),
        status: status[Math.floor(Math.random() * 5)],
        price: faker.commerce.price(),
        ord_date: orderDate,
        items: [items[Math.floor(Math.random() * 10)], items[Math.floor(Math.random() * 10)]]
    });
}

proc.stdin.write(JSON.stringify(ordersv2));
proc.stdin.end();