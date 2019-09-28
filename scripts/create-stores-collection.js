"use strict";

var db = connect("localhost:27017/nosql_workshop");

var stores = [
    {"name":"Quigley - Gutmann","description":"well-modulated"},{"name":"Christiansen LLC","description":"attitude-oriented"},{"name":"Streich - Larkin","description":"multimedia"},{"name":"Homenick - Rau","description":"methodical"},{"name":"Beatty, Schmitt and Daugherty","description":"content-based"},{"name":"Leannon - Kuvalis","description":"background"},{"name":"Schiller and Sons","description":"coherent"},{"name":"Leffler, Schamberger and Little","description":"bi-directional"},{"name":"Feeney Group","description":"discrete"},{"name":"Blick Group","description":"tertiary"},{"name":"Mohr Group","description":"analyzing"},{"name":"Marquardt - Mosciski","description":"stable"},{"name":"Pfeffer LLC","description":"interactive"},{"name":"Berge, Skiles and Nienow","description":"zero defect"},{"name":"Hansen - Eichmann","description":"human-resource"},{"name":"Osinski - Yost","description":"context-sensitive"},{"name":"Jacobi - Zboncak","description":"transitional"},{"name":"Schulist - Monahan","description":"dedicated"},{"name":"Mills - Harvey","description":"needs-based"},{"name":"Cummings Inc","description":"6th generation"},{"name":"Sporer Group","description":"mission-critical"},{"name":"Breitenberg, Hane and Auer","description":"grid-enabled"},{"name":"Marquardt - Orn","description":"maximized"},{"name":"Wintheiser - Grimes","description":"full-range"},{"name":"Frami, Wolff and White","description":"stable"},{"name":"Collier - Waelchi","description":"executive"},{"name":"Homenick LLC","description":"next generation"},{"name":"Shields, Oberbrunner and Johnson","description":"modular"},{"name":"Bashirian Inc","description":"uniform"},{"name":"Erdman Inc","description":"zero tolerance"},{"name":"Zieme - Grant","description":"neutral"},{"name":"Breitenberg - O'Connell","description":"optimizing"},{"name":"Schumm, Kuhn and Streich","description":"maximized"},{"name":"McClure, Grant and Kuhlman","description":"global"},{"name":"Miller - Flatley","description":"client-server"},{"name":"Zieme, Bauch and Ziemann","description":"5th generation"},{"name":"Altenwerth Inc","description":"actuating"},{"name":"Quitzon Inc","description":"value-added"},{"name":"Douglas - Schiller","description":"eco-centric"},{"name":"Breitenberg - Oberbrunner","description":"static"},{"name":"Jacobs - Kub","description":"24/7"},{"name":"Aufderhar, Nikolaus and Breitenberg","description":"intermediate"},{"name":"Leannon, Crist and Weimann","description":"optimal"},{"name":"Brown - Lind","description":"clear-thinking"},{"name":"Hudson - Schroeder","description":"needs-based"},{"name":"Frami and Sons","description":"asynchronous"},{"name":"Padberg Inc","description":"grid-enabled"},{"name":"Heathcote - Spinka","description":"mission-critical"},{"name":"Little, Thompson and Lockman","description":"clear-thinking"},{"name":"Johnston Inc","description":"solution-oriented"}
];

stores.map(store => {
    db.stores.insertOne({
        _id: new ObjectId(),
        name: store.name,
        description: store.description
    });
});


// create the text index on the text field and a description text index.
db.stores.createIndex({ name: "text", description: "text" });
