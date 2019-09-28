"use strict";

var db = connect("localhost:27017/nosql_workshop");

var articles = [
    {"subject":"Donnelly, Konopelski and Pagac","title":"Reduced explicit installation"},{"subject":"Lesch Inc","title":"Horizontal system-worthy migration"},{"subject":"Franecki, Crist and Bruen","title":"De-engineered directional core"},{"subject":"Weber LLC","title":"Optimized contextually-based time-frame"},{"subject":"Jakubowski and Sons","title":"Monitored upward-trending structure"},{"subject":"Schroeder and Sons","title":"Multi-tiered tangible protocol"},{"subject":"Leuschke Group","title":"Re-contextualized web-enabled matrix"},{"subject":"Pacocha, Shields and West","title":"Balanced leading edge support"},{"subject":"Wyman - Daugherty","title":"Cross-platform mission-critical forecast"},{"subject":"Jacobi Group","title":"Extended bottom-line toolset"},{"subject":"Schmidt - Hane","title":"Visionary empowering neural-net"},{"subject":"Witting - Jones","title":"Visionary uniform help-desk"},{"subject":"Weimann Group","title":"Fundamental fault-tolerant algorithm"},{"subject":"Kohler, Blanda and Gerlach","title":"Horizontal even-keeled utilisation"},{"subject":"Blanda Group","title":"Object-based human-resource function"},{"subject":"Larkin - Pagac","title":"Organized bottom-line secured line"},{"subject":"Schumm, Rowe and Jaskolski","title":"Object-based methodical initiative"},{"subject":"Jakubowski, Willms and Schroeder","title":"Balanced bi-directional implementation"},{"subject":"Green, Toy and Gulgowski","title":"Switchable 6th generation project"},{"subject":"Rice - Fay","title":"Object-based explicit intranet"},{"subject":"Block Inc","title":"Fully-configurable leading edge function"},{"subject":"VonRueden and Sons","title":"Pre-emptive systematic data-warehouse"},{"subject":"Witting, Wiza and Kling","title":"Optimized content-based workforce"},{"subject":"Corwin, Kuhic and Borer","title":"Synergistic optimizing concept"},{"subject":"Wilderman, McKenzie and Schuppe","title":"Multi-layered global model"},{"subject":"Daugherty, Terry and Schmeler","title":"User-friendly system-worthy info-mediaries"},{"subject":"Kunze - Prohaska","title":"Reverse-engineered 3rd generation access"},{"subject":"Waelchi Inc","title":"Open-source secondary flexibility"},{"subject":"Schuppe - Nader","title":"Total object-oriented capability"},{"subject":"Kihn Inc","title":"Optional full-range forecast"},{"subject":"Kertzmann Inc","title":"Reduced 5th generation matrices"},{"subject":"Schultz LLC","title":"Face to face bi-directional conglomeration"},{"subject":"Yundt, Weber and Adams","title":"Synergized value-added product"},{"subject":"Corwin, Grimes and Tremblay","title":"Automated disintermediate artificial intelligence"},{"subject":"Kutch Inc","title":"Enhanced encompassing hierarchy"},{"subject":"Okuneva, Kuvalis and Kihn","title":"Reactive clear-thinking leverage"},{"subject":"Robel Group","title":"Visionary content-based function"},{"subject":"West - Koelpin","title":"Exclusive next generation infrastructure"},{"subject":"Lindgren - Crona","title":"Customer-focused composite time-frame"},{"subject":"Kreiger Group","title":"Cross-platform zero tolerance conglomeration"},{"subject":"Greenholt LLC","title":"Profit-focused empowering methodology"},{"subject":"Gutkowski - Mills","title":"Synergistic bi-directional neural-net"},{"subject":"Kiehn Group","title":"Exclusive analyzing orchestration"},{"subject":"Davis, Kassulke and Brown","title":"Balanced homogeneous productivity"},{"subject":"Bogan, Price and Grady","title":"Diverse homogeneous application"},{"subject":"Armstrong - Satterfield","title":"Vision-oriented web-enabled methodology"},{"subject":"Rippin, Powlowski and Kuhlman","title":"Adaptive full-range forecast"},{"subject":"Feeney, Abernathy and Kunde","title":"Self-enabling holistic definition"},{"subject":"Braun Group","title":"Stand-alone multimedia open system"},{"subject":"Kuhn Group","title":"Polarised intangible time-frame"},{ "subject": "cake tea", "title": "Some cakes with that tea"}
];

articles.map(article => {
    db.articles.insertOne({
        _id: new ObjectId(),
        subject: article.subject,
        title: article.title
    });
});

// create the text index on the text field.
db.articles.createIndex({ subject: "text", title: "text" });
