"use strict";

let db = connect("localhost:27017/nosql_workshop");

let userPrefs = [{"firstName":"Ford","lastName":"Stroman","joined":"2018-09-12","likes":["Air sports","Metalworking"]},{"firstName":"Karolann","lastName":"Rempel","joined":"2018-08-11","likes":["Stone skipping","Bird watching"]},{"firstName":"Gregoria","lastName":"Anderson","joined":"2019-01-14","likes":["amateur radio","Poi"]},{"firstName":"Lorna","lastName":"Witting","joined":"2019-02-23","likes":["Bird watching","Dance"]},{"firstName":"Alyson","lastName":"Walker","joined":"2018-08-16","likes":["Sewing","Stone skipping"]},{"firstName":"Jeffrey","lastName":"Prohaska","joined":"2019-02-23","likes":["Baton twirling","Surfing"]},{"firstName":"Marguerite","lastName":"Daugherty","joined":"2018-05-17","likes":["Driving","Origami"]},{"firstName":"Garrison","lastName":"Kozey","joined":"2019-02-03","likes":["Watching movies","Candle making"]},{"firstName":"Dave","lastName":"Hauck","joined":"2018-03-29","likes":["Coloring","Sailing"]},{"firstName":"Carolina","lastName":"Casper","joined":"2018-05-18","likes":["Mycology","Leather crafting"]},{"firstName":"Randall","lastName":"Maggio","joined":"2018-11-10","likes":["Foreign language learning","Inline skating"]},{"firstName":"Ronny","lastName":"Osinski","joined":"2018-11-14","likes":["Photography","Inline skating"]},{"firstName":"Edison","lastName":"Williamson","joined":"2018-09-19","likes":["Bodybuilding","Jewelry making"]},{"firstName":"Destin","lastName":"Bins","joined":"2018-11-28","likes":["Ghost hunting","Acting"]},{"firstName":"Shanie","lastName":"Goodwin","joined":"2018-09-15","likes":["Web surfing","Sketching"]},{"firstName":"Giovanny","lastName":"Murphy","joined":"2019-03-02","likes":["Swimming","Listening to music"]},{"firstName":"Emmy","lastName":"Olson","joined":"2018-10-18","likes":["Cycling","Reading"]},{"firstName":"Kiel","lastName":"Murazik","joined":"2018-10-12","likes":["tabletop games","Gaming"]},{"firstName":"Velva","lastName":"Rosenbaum","joined":"2018-06-08","likes":["Yoga","Computer programming"]},{"firstName":"Laurence","lastName":"Marvin","joined":"2018-05-10","likes":["Fishing","Archery"]},{"firstName":"Lavada","lastName":"Johns","joined":"2018-05-01","likes":["Skiing","Archery"]},{"firstName":"Theodore","lastName":"Price","joined":"2018-11-05","likes":["Woodworking","Paintball"]},{"firstName":"Kenton","lastName":"Emard","joined":"2019-02-07","likes":["Scuba diving","Dance"]},{"firstName":"Sincere","lastName":"DuBuque","joined":"2018-04-10","likes":["Flag Football","Hunting"]},{"firstName":"Jackson","lastName":"Kuhlman","joined":"2018-10-13","likes":["Photography","Drawing"]},{"firstName":"Ashleigh","lastName":"Erdman","joined":"2018-05-14","likes":["Dance","Rugby"]},{"firstName":"Paxton","lastName":"Rath","joined":"2019-02-14","likes":["Sailing","Ice skating"]},{"firstName":"Triston","lastName":"Stracke","joined":"2018-06-16","likes":["Gardening","Gunsmithing"]},{"firstName":"Marjolaine","lastName":"Hartmann","joined":"2018-04-19","likes":["Motor sports","Paintball"]},{"firstName":"Daren","lastName":"Ryan","joined":"2019-03-08","likes":["Polo","Taekwondo"]},{"firstName":"Madeline","lastName":"Kemmer","joined":"2018-08-17","likes":["Computer programming","Cooking"]},{"firstName":"Alfreda","lastName":"Kiehn","joined":"2019-01-15","likes":["Beekeeping","Sand art"]},{"firstName":"Foster","lastName":"Rosenbaum","joined":"2018-11-20","likes":["Embroidery","Orienteering"]},{"firstName":"Davin","lastName":"Casper","joined":"2018-07-01","likes":["scrapbook","amateur radio"]},{"firstName":"Omari","lastName":"McLaughlin","joined":"2018-09-25","likes":["Tai chi","Nordic skating"]},{"firstName":"Emil","lastName":"Hilll","joined":"2019-03-12","likes":["Sailing","Basketball"]},{"firstName":"Amy","lastName":"Weissnat","joined":"2018-08-22","likes":["Handball","Drama"]},{"firstName":"Nona","lastName":"Runolfsson","joined":"2019-03-17","likes":["Sailing","Metal detecting"]},{"firstName":"Hertha","lastName":"Ratke","joined":"2019-03-20","likes":["Computer programming","Horseback riding"]},{"firstName":"Tate","lastName":"Jones","joined":"2018-06-11","likes":["Roller skating","Blacksmithing"]},{"firstName":"Lelia","lastName":"Weissnat","joined":"2019-01-23","likes":["Mycology","Orienteering"]},{"firstName":"Isaac","lastName":"Welch","joined":"2018-10-16","likes":["Rowing","Skateboarding"]},{"firstName":"Saige","lastName":"Okuneva","joined":"2019-02-03","likes":["Puzzles","Painting"]},{"firstName":"Rigoberto","lastName":"Langosh","joined":"2018-12-16","likes":["Surfing","Cabaret"]},{"firstName":"Eve","lastName":"Hartmann","joined":"2018-09-25","likes":["Drawing","Lacemaking"]},{"firstName":"Myrna","lastName":"Bartoletti","joined":"2019-01-06","likes":["Flying disc","amateur radio"]},{"firstName":"Euna","lastName":"Streich","joined":"2019-02-17","likes":["Flag Football","Mushroom hunting"]},{"firstName":"Verner","lastName":"DuBuque","joined":"2019-01-28","likes":["role-playing games","Glassblowing"]},{"firstName":"Ida","lastName":"Murazik","joined":"2018-09-05","likes":["Machining","Couponing"]},{"firstName":"Tiffany","lastName":"Koch","joined":"2018-07-25","likes":["Nordic skating","Board sports"]},{"firstName":"Aryanna","lastName":"Keebler","joined":"2018-04-28","likes":["Mushroom hunting","Gaming"]},{"firstName":"Abelardo","lastName":"Walter","joined":"2018-10-21","likes":["Drawing","Pottery"]},{"firstName":"Antonio","lastName":"Emmerich","joined":"2019-01-08","likes":["Fishing","Calligraphy"]},{"firstName":"Princess","lastName":"O'Reilly","joined":"2018-09-14","likes":["Embroidery","Couponing"]},{"firstName":"Mose","lastName":"Schumm","joined":"2019-03-21","likes":["Candle making","Sailing"]},{"firstName":"Darrel","lastName":"West","joined":"2018-09-12","likes":["Archery","Fashion"]},{"firstName":"Hilton","lastName":"Jakubowski","joined":"2018-11-17","likes":["LARPing","Yo-yoing"]},{"firstName":"Robb","lastName":"Brekke","joined":"2018-12-20","likes":["Model building","Book restoration"]},{"firstName":"Julian","lastName":"Kassulke","joined":"2018-09-31","likes":["Cosplaying","Flying disc"]},{"firstName":"Ibrahim","lastName":"Legros","joined":"2018-07-24","likes":["Nordic skating","Crocheting"]},{"firstName":"Simone","lastName":"Metz","joined":"2018-12-20","likes":["Juggling","Nordic skating"]},{"firstName":"Ahmed","lastName":"Kulas","joined":"2018-12-29","likes":["Book restoration","Yoga"]},{"firstName":"Marisa","lastName":"Koss","joined":"2018-06-03","likes":["Brazilian jiu-jitsu","Shooting"]},{"firstName":"Nova","lastName":"Legros","joined":"2019-02-28","likes":["Candle making","amateur radio"]},{"firstName":"Dax","lastName":"Zieme","joined":"2018-09-11","likes":["Table tennis","Fishing"]},{"firstName":"Leatha","lastName":"Daniel","joined":"2018-11-08","likes":["Hunting","Stand-up comedy"]},{"firstName":"Joshuah","lastName":"Pacocha","joined":"2019-02-24","likes":["Gaming","Embroidery"]},{"firstName":"Payton","lastName":"Rowe","joined":"2018-10-15","likes":["Candle making","Driving"]},{"firstName":"Christina","lastName":"Abernathy","joined":"2018-05-24","likes":["Kabaddi","Candle making"]},{"firstName":"Elizabeth","lastName":"Muller","joined":"2018-07-28","likes":["Slacklining","Jogging"]},{"firstName":"Jedediah","lastName":"White","joined":"2018-08-06","likes":["Crocheting","Netball"]},{"firstName":"Kelton","lastName":"Heidenreich","joined":"2018-10-30","likes":["Wood carving","Calligraphy"]},{"firstName":"Lambert","lastName":"VonRueden","joined":"2018-05-12","likes":["Sports","Hunting"]},{"firstName":"Cedrick","lastName":"Bosco","joined":"2018-07-24","likes":["Leather crafting","Inline skating"]},{"firstName":"Domenica","lastName":"Gusikowski","joined":"2018-04-18","likes":["Sudoku","Photography"]},{"firstName":"Judy","lastName":"Sauer","joined":"2018-11-22","likes":["Geocaching","3D printing"]},{"firstName":"Alford","lastName":"Mayer","joined":"2018-06-17","likes":["Hooping","Ghost hunting"]},{"firstName":"Jamel","lastName":"Nolan","joined":"2018-09-14","likes":["Gardening","scrapbook"]},{"firstName":"Rahul","lastName":"Heller","joined":"2018-08-28","likes":["Rugby","Electronics"]},{"firstName":"Laron","lastName":"Stroman","joined":"2019-02-26","likes":["Table tennis","Flying"]},{"firstName":"Tania","lastName":"Aufderhar","joined":"2018-08-26","likes":["Amateur radio","Pottery"]},{"firstName":"Geo","lastName":"Hoppe","joined":"2018-07-14","likes":["Parkour","Fishing"]},{"firstName":"Kody","lastName":"Zulauf","joined":"2018-12-25","likes":["LARPing","Flying disc"]},{"firstName":"Jess","lastName":"Crist","joined":"2019-02-21","likes":["Drama","Homebrewing"]},{"firstName":"Sandrine","lastName":"Batz","joined":"2018-10-07","likes":["Mycology","Shopping"]},{"firstName":"Marta","lastName":"Cormier","joined":"2018-11-05","likes":["Creative writing","Dowsing"]},{"firstName":"Lilian","lastName":"Batz","joined":"2019-01-02","likes":["Calligraphy","Video gaming"]},{"firstName":"Eda","lastName":"Mertz","joined":"2018-10-04","likes":["Worldbuilding","Ghost hunting"]},{"firstName":"Kay","lastName":"Weissnat","joined":"2018-09-17","likes":["Air sports","Roller skating"]},{"firstName":"Murl","lastName":"Murphy","joined":"2018-10-08","likes":["Scuba diving","Geocaching"]},{"firstName":"Maximus","lastName":"Witting","joined":"2018-08-17","likes":["Rafting","Quilting"]},{"firstName":"Marlon","lastName":"Gerhold","joined":"2018-04-11","likes":["Stand-up comedy","amateur radio"]},{"firstName":"Katelynn","lastName":"Goyette","joined":"2018-07-17","likes":["Drawing","Taxidermy"]},{"firstName":"Bridgette","lastName":"Fay","joined":"2018-10-05","likes":["Archery","Graffiti"]},{"firstName":"Ashlynn","lastName":"Gutmann","joined":"2018-11-20","likes":["Taekwondo","Skydiving"]},{"firstName":"Queen","lastName":"Ferry","joined":"2019-01-32","likes":["Quilting","Motor sports"]},{"firstName":"Aryanna","lastName":"Stroman","joined":"2018-05-05","likes":["Scuba diving","scrapbook"]},{"firstName":"Stephen","lastName":"Jaskolski","joined":"2019-01-26","likes":["Mushroom hunting","Candle making"]},{"firstName":"Francis","lastName":"Larson","joined":"2018-09-30","likes":["Poi","Fashion"]},{"firstName":"Damaris","lastName":"Hamill","joined":"2018-12-15","likes":["Scouting","Video gaming"]},{"firstName":"Jeffrey","lastName":"Maggio","joined":"2018-08-06","likes":["Computer programming","Cosplaying"]},{"firstName":"Rosella","lastName":"Auer","joined":"2019-02-12","likes":["Sports","Paintball"]},{"firstName":"Jovany","lastName":"Shanahan","joined":"2018-07-31","likes":["Ghost hunting","Pottery"]},{"firstName":"Ryan","lastName":"Ortiz","joined":"2018-11-15","likes":["Vacation","Gunsmithing"]},{"firstName":"Isobel","lastName":"Boehm","joined":"2018-09-31","likes":["Rugby","Running"]},{"firstName":"Moses","lastName":"D'Amore","joined":"2018-12-01","likes":["Computer programming","Macrame"]},{"firstName":"Hilbert","lastName":"Bernhard","joined":"2018-11-21","likes":["Sculling","Scrapbooking"]},{"firstName":"Janelle","lastName":"Hauck","joined":"2018-11-23","likes":["Worldbuilding","Bird watching"]},{"firstName":"Estell","lastName":"Rempel","joined":"2019-02-23","likes":["Do it yourself","Mycology"]},{"firstName":"Kaylah","lastName":"Sanford","joined":"2018-05-27","likes":["Puzzles","Jogging"]},{"firstName":"Westley","lastName":"Romaguera","joined":"2018-03-31","likes":["Scuba diving","Skydiving"]},{"firstName":"Angel","lastName":"Smitham","joined":"2019-03-04","likes":["Woodworking","Flying"]},{"firstName":"Elvera","lastName":"Herman","joined":"2019-01-31","likes":["Sculpting","Roller skating"]},{"firstName":"Barney","lastName":"Waelchi","joined":"2018-10-14","likes":["Lapidary","Rock climbing"]},{"firstName":"Beaulah","lastName":"Metz","joined":"2019-03-25","likes":["Flying","Slacklining"]},{"firstName":"Colleen","lastName":"Quitzon","joined":"2019-03-11","likes":["Kite flying","Backpacking"]},{"firstName":"Stacey","lastName":"Welch","joined":"2018-08-25","likes":["Genealogy","Polo"]},{"firstName":"Maegan","lastName":"Langosh","joined":"2018-08-20","likes":["Book restoration","Skydiving"]},{"firstName":"Antonietta","lastName":"Hagenes","joined":"2018-04-11","likes":["Homebrewing","Video gaming"]},{"firstName":"Price","lastName":"Huels","joined":"2018-08-05","likes":["Fishing","Taekwondo"]},{"firstName":"Catharine","lastName":"Steuber","joined":"2019-03-03","likes":["Swimming","Inline skating"]},{"firstName":"Shirley","lastName":"Jacobson","joined":"2018-05-23","likes":["Stand-up comedy","Foraging"]},{"firstName":"Maribel","lastName":"Von","joined":"2018-07-29","likes":["Bird watching","Bird watching"]},{"firstName":"Rickey","lastName":"Reilly","joined":"2018-08-04","likes":["Sketching","Foraging"]},{"firstName":"Zula","lastName":"Champlin","joined":"2019-02-05","likes":["Playing musical instruments","Mountaineering"]},{"firstName":"Brian","lastName":"Cummings","joined":"2018-06-30","likes":["Flag Football","Vacation"]},{"firstName":"Janelle","lastName":"Wolff","joined":"2018-06-19","likes":["Ice skating","Geocaching"]},{"firstName":"Jack","lastName":"Kemmer","joined":"2019-02-17","likes":["Yoga","Foreign language learning"]},{"firstName":"Edwina","lastName":"Wintheiser","joined":"2018-11-25","likes":["Air sports","Netball"]},{"firstName":"Mitchell","lastName":"Mueller","joined":"2018-09-23","likes":["Community","Dance"]},{"firstName":"Jabari","lastName":"Fahey","joined":"2018-04-04","likes":["Worldbuilding","Archery"]},{"firstName":"Evie","lastName":"Wintheiser","joined":"2018-05-01","likes":["Taxidermy","Cycling"]},{"firstName":"Paige","lastName":"D'Amore","joined":"2018-06-18","likes":["Nordic skating","Cooking"]},{"firstName":"Nadia","lastName":"Cassin","joined":"2019-02-17","likes":["Parkour","Polo"]},{"firstName":"Antonette","lastName":"Corwin","joined":"2018-05-05","likes":["Running","Hunting"]},{"firstName":"Nathen","lastName":"Bogan","joined":"2018-11-21","likes":["Creative writing","Wood carving"]},{"firstName":"Emil","lastName":"Pouros","joined":"2018-09-14","likes":["Scuba diving","tabletop games"]},{"firstName":"Luisa","lastName":"Bruen","joined":"2019-02-12","likes":["Yoga","Metalworking"]},{"firstName":"Enola","lastName":"Keebler","joined":"2018-11-10","likes":["Water sports","Genealogy"]},{"firstName":"Jay","lastName":"Schowalter","joined":"2018-04-22","likes":["Embroidery","Jewelry making"]},{"firstName":"Whitney","lastName":"Collier","joined":"2018-09-11","likes":["Skiing","Parkour"]},{"firstName":"Dayne","lastName":"Upton","joined":"2018-09-12","likes":["Geocaching","Skimboarding"]},{"firstName":"Lamont","lastName":"Ankunding","joined":"2018-10-16","likes":["Blacksmithing","Bird watching"]},{"firstName":"Sheldon","lastName":"Tromp","joined":"2019-03-24","likes":["Foreign language learning","Water sports"]},{"firstName":"Tony","lastName":"Hand","joined":"2018-09-01","likes":["Painting","Machining"]},{"firstName":"Rosanna","lastName":"Luettgen","joined":"2018-09-22","likes":["Surfing","Kayaking"]},{"firstName":"Darion","lastName":"Eichmann","joined":"2018-11-05","likes":["Skateboarding","Reading"]},{"firstName":"Raquel","lastName":"Stanton","joined":"2019-02-16","likes":["Digital arts","Jewelry making"]},{"firstName":"Estella","lastName":"Powlowski","joined":"2018-07-04","likes":["Sculling","LARPing"]},{"firstName":"Haleigh","lastName":"Gaylord","joined":"2018-05-26","likes":["Coloring","Ghost hunting"]},{"firstName":"Maximo","lastName":"Bartell","joined":"2018-05-04","likes":["Dowsing","Stand-up comedy"]},{"firstName":"Korbin","lastName":"Shanahan","joined":"2018-09-16","likes":["Leather crafting","Web surfing"]},{"firstName":"Stephania","lastName":"Cremin","joined":"2018-08-05","likes":["Playing musical instruments","Pottery"]},{"firstName":"Esteban","lastName":"Armstrong","joined":"2018-04-23","likes":["role-playing games","Bodybuilding"]},{"firstName":"Darrion","lastName":"Nolan","joined":"2019-03-20","likes":["Parkour","Photography"]},{"firstName":"Alvena","lastName":"Bergnaum","joined":"2018-07-22","likes":["Slacklining","Tai chi"]},{"firstName":"Corene","lastName":"Wyman","joined":"2018-09-01","likes":["Woodworking","Scuba diving"]},{"firstName":"Shaun","lastName":"Jakubowski","joined":"2019-01-13","likes":["Glassblowing","Amateur radio"]},{"firstName":"Malcolm","lastName":"Cronin","joined":"2018-08-15","likes":["Embroidery","Basketball"]},{"firstName":"Corene","lastName":"Heaney","joined":"2019-01-05","likes":["Machining","Coloring"]},{"firstName":"Benedict","lastName":"McGlynn","joined":"2018-12-27","likes":["Shooting","Photography"]},{"firstName":"Tanya","lastName":"Swaniawski","joined":"2019-01-12","likes":["Watching movies","Sketching"]},{"firstName":"Irma","lastName":"Yundt","joined":"2018-06-10","likes":["Glassblowing","Dance"]},{"firstName":"Martina","lastName":"Olson","joined":"2018-12-14","likes":["Urban exploration","Coffee roasting"]},{"firstName":"Reba","lastName":"Gaylord","joined":"2018-08-25","likes":["Bodybuilding","Dance"]},{"firstName":"Christa","lastName":"Luettgen","joined":"2018-06-12","likes":["Kabaddi","Vacation"]},{"firstName":"Micaela","lastName":"Beier","joined":"2018-08-29","likes":["Skateboarding","Shopping"]},{"firstName":"Emanuel","lastName":"Morar","joined":"2019-03-14","likes":["Candle making","Sketching"]}];

for (let i = 0; i < userPrefs.length; i ++) {
    db.userstats.insertOne({
        _id: new ObjectId(),
        firstName: userPrefs[i].firstName,
        lastName: userPrefs[i].lastName,
        joined: ISODate(userPrefs[i].joined),
        likes: userPrefs[i].likes
    });
}