"use strict";

let db = connect("localhost:27017/nosql_workshop");

let orders = [{"cust_id":"1000005333616650","amount":"48.51","status":"E","price":"467.00","ord_date":"2018-12-25","items":[{"sku":"bbb","qty":3,"price":2.55},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000003072352912","amount":"161.88","status":"B","price":"679.00","ord_date":"2019-02-16","items":[{"sku":"ccc","qty":8.5,"price":9.25},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000053346617464","amount":"461.42","status":"A","price":"751.00","ord_date":"2019-01-07","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000001314986310","amount":"295.63","status":"A","price":"601.00","ord_date":"2019-03-16","items":[{"sku":"nnn","qty":5,"price":2.5},{"sku":"bbb","qty":3,"price":2.55}]},{"cust_id":"1000094333485741","amount":"815.94","status":"A","price":"623.00","ord_date":"2019-02-20","items":[{"sku":"zzz","qty":5,"price":2.75},{"sku":"aaa","qty":2,"price":4.55}]},{"cust_id":"1000005333616650","amount":"520.65","status":"B","price":"940.00","ord_date":"2018-08-26","items":[{"sku":"ccc","qty":8.5,"price":9.25},{"sku":"abc","qty":8,"price":4.5}]},{"cust_id":"1000057392290345","amount":"191.54","status":"D","price":"367.00","ord_date":"2018-10-15","items":[{"sku":"vvv","qty":7,"price":3.5},{"sku":"vvv","qty":7,"price":3.5}]},{"cust_id":"1000026126567846","amount":"239.47","status":"B","price":"259.00","ord_date":"2018-04-13","items":[{"sku":"aaa","qty":2,"price":4.55},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000094908846844","amount":"183.69","status":"B","price":"521.00","ord_date":"2019-02-26","items":[{"sku":"bbb","qty":3,"price":2.55},{"sku":"nnn","qty":5,"price":2.5}]},{"cust_id":"1000063269834566","amount":"738.31","status":"A","price":"560.00","ord_date":"2018-08-20","items":[{"sku":"abc","qty":8,"price":4.5},{"sku":"aaa","qty":2,"price":4.55}]},{"cust_id":"1000005333616650","amount":"627.61","status":"B","price":"787.00","ord_date":"2018-07-16","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"zzz","qty":5,"price":2.75}]},{"cust_id":"1000038267949603","amount":"909.79","status":"A","price":"782.00","ord_date":"2018-10-07","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000017170202057","amount":"626.44","status":"B","price":"210.00","ord_date":"2019-02-05","items":[{"sku":"mmm","qty":5,"price":2.5},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000098662627873","amount":"260.84","status":"B","price":"565.00","ord_date":"2019-02-13","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"bbb","qty":3,"price":2.55}]},{"cust_id":"1000020397946675","amount":"369.54","status":"A","price":"509.00","ord_date":"2019-03-23","items":[{"sku":"abc","qty":8,"price":4.5},{"sku":"ccc","qty":8.5,"price":9.25}]},{"cust_id":"1000005333616650","amount":"938.32","status":"B","price":"940.00","ord_date":"2018-08-13","items":[{"sku":"zzz","qty":5,"price":2.75},{"sku":"vvv","qty":7,"price":3.5}]},{"cust_id":"1000007257308531","amount":"549.24","status":"E","price":"844.00","ord_date":"2019-03-03","items":[{"sku":"mmm","qty":5,"price":2.5},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000042719397661","amount":"693.58","status":"D","price":"842.00","ord_date":"2018-07-26","items":[{"sku":"mmm","qty":5,"price":2.5},{"sku":"aaa","qty":2,"price":4.55}]},{"cust_id":"1000007183973482","amount":"416.89","status":"E","price":"666.00","ord_date":"2019-02-22","items":[{"sku":"abc","qty":8,"price":4.5},{"sku":"abc","qty":8,"price":4.5}]},{"cust_id":"1000099503963980","amount":"250.46","status":"B","price":"321.00","ord_date":"2018-06-08","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"ooo","qty":6,"price":2.8}]},{"cust_id":"1000005333616650","amount":"951.86","status":"E","price":"890.00","ord_date":"2018-05-10","items":[{"sku":"zzz","qty":5,"price":2.75},{"sku":"mmm","qty":5,"price":2.5}]},{"cust_id":"1000097510429813","amount":"643.82","status":"B","price":"247.00","ord_date":"2018-12-19","items":[{"sku":"ccc","qty":8.5,"price":9.25},{"sku":"vvv","qty":7,"price":3.5}]},{"cust_id":"1000061901257614","amount":"182.32","status":"C","price":"876.00","ord_date":"2019-01-22","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"abc","qty":8,"price":4.5}]},{"cust_id":"1000008962697724","amount":"928.87","status":"C","price":"433.00","ord_date":"2018-11-27","items":[{"sku":"vvv","qty":7,"price":3.5},{"sku":"vvv","qty":7,"price":3.5}]},{"cust_id":"1000022442870387","amount":"512.13","status":"B","price":"398.00","ord_date":"2018-06-16","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"ooo","qty":6,"price":2.8}]},{"cust_id":"1000005333616650","amount":"996.33","status":"D","price":"412.00","ord_date":"2018-05-30","items":[{"sku":"bbb","qty":3,"price":2.55},{"sku":"aaa","qty":2,"price":4.55}]},{"cust_id":"1000068492530045","amount":"380.22","status":"C","price":"521.00","ord_date":"2018-11-08","items":[{"sku":"abc","qty":8,"price":4.5},{"sku":"zzz","qty":5,"price":2.75}]},{"cust_id":"1000090894807018","amount":"482.26","status":"A","price":"249.00","ord_date":"2018-04-21","items":[{"sku":"aaa","qty":2,"price":4.55},{"sku":"ccc","qty":8.5,"price":9.25}]},{"cust_id":"1000061918505997","amount":"272.29","status":"D","price":"300.00","ord_date":"2018-04-15","items":[{"sku":"ccc","qty":8.5,"price":9.25},{"sku":"bbb","qty":3,"price":2.55}]},{"cust_id":"1000036325864792","amount":"365.71","status":"D","price":"361.00","ord_date":"2019-02-18","items":[{"sku":"nnn","qty":5,"price":2.5},{"sku":"nnn","qty":5,"price":2.5}]},{"cust_id":"1000005333616650","amount":"551.65","status":"B","price":"754.00","ord_date":"2019-02-20","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000056535219158","amount":"266.42","status":"C","price":"944.00","ord_date":"2018-12-13","items":[{"sku":"bbb","qty":3,"price":2.55},{"sku":"ccc","qty":8.5,"price":9.25}]},{"cust_id":"1000012354364654","amount":"225.52","status":"D","price":"394.00","ord_date":"2018-09-13","items":[{"sku":"mmm","qty":5,"price":2.5},{"sku":"bbb","qty":3,"price":2.55}]},{"cust_id":"1000082011414983","amount":"361.75","status":"D","price":"773.00","ord_date":"2018-09-04","items":[{"sku":"mmm","qty":5,"price":2.5},{"sku":"zzz","qty":5,"price":2.75}]},{"cust_id":"1000059894230132","amount":"125.59","status":"E","price":"228.00","ord_date":"2018-12-04","items":[{"sku":"zzz","qty":5,"price":2.75},{"sku":"mmm","qty":5,"price":2.5}]},{"cust_id":"1000005333616650","amount":"713.07","status":"D","price":"988.00","ord_date":"2019-02-27","items":[{"sku":"vvv","qty":7,"price":3.5},{"sku":"mmm","qty":5,"price":2.5}]},{"cust_id":"1000063802986783","amount":"182.25","status":"B","price":"615.00","ord_date":"2019-01-17","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"nnn","qty":5,"price":2.5}]},{"cust_id":"1000033055635525","amount":"421.72","status":"A","price":"871.00","ord_date":"2018-11-31","items":[{"sku":"aaa","qty":2,"price":4.55},{"sku":"mmm","qty":5,"price":2.5}]},{"cust_id":"1000036044134558","amount":"633.02","status":"E","price":"727.00","ord_date":"2018-07-12","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"nnn","qty":5,"price":2.5}]},{"cust_id":"1000054358822687","amount":"530.72","status":"E","price":"738.00","ord_date":"2018-07-30","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"zzz","qty":5,"price":2.75}]},{"cust_id":"1000005333616650","amount":"603.03","status":"B","price":"169.00","ord_date":"2018-08-19","items":[{"sku":"bbb","qty":3,"price":2.55},{"sku":"ooo","qty":6,"price":2.8}]},{"cust_id":"1000011744111229","amount":"458.01","status":"D","price":"614.00","ord_date":"2019-02-26","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000082100871404","amount":"422.58","status":"C","price":"120.00","ord_date":"2018-08-06","items":[{"sku":"zzz","qty":5,"price":2.75},{"sku":"bbb","qty":3,"price":2.55}]},{"cust_id":"1000019966901211","amount":"106.75","status":"C","price":"828.00","ord_date":"2018-03-32","items":[{"sku":"ccc","qty":8.5,"price":9.25},{"sku":"vvv","qty":7,"price":3.5}]},{"cust_id":"1000077864000727","amount":"743.15","status":"D","price":"756.00","ord_date":"2018-05-26","items":[{"sku":"bbb","qty":3,"price":2.55},{"sku":"nnn","qty":5,"price":2.5}]},{"cust_id":"1000005333616650","amount":"11.76","status":"D","price":"549.00","ord_date":"2018-05-19","items":[{"sku":"mmm","qty":5,"price":2.5},{"sku":"mmm","qty":5,"price":2.5}]},{"cust_id":"1000043905364167","amount":"15.88","status":"B","price":"668.00","ord_date":"2018-10-10","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"zzz","qty":5,"price":2.75}]},{"cust_id":"1000023325338527","amount":"934.12","status":"E","price":"716.00","ord_date":"2018-11-19","items":[{"sku":"abc","qty":8,"price":4.5},{"sku":"zzz","qty":5,"price":2.75}]},{"cust_id":"1000031101504297","amount":"150.06","status":"A","price":"388.00","ord_date":"2018-04-08","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"abc","qty":8,"price":4.5}]},{"cust_id":"1000018059380477","amount":"626.72","status":"E","price":"972.00","ord_date":"2018-07-12","items":[{"sku":"vvv","qty":7,"price":3.5},{"sku":"bbb","qty":3,"price":2.55}]},{"cust_id":"1000005333616650","amount":"144.62","status":"C","price":"879.00","ord_date":"2018-10-06","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"ooo","qty":6,"price":2.8}]},{"cust_id":"1000047949823024","amount":"34.04","status":"C","price":"949.00","ord_date":"2018-08-22","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000097350453788","amount":"914.24","status":"D","price":"258.00","ord_date":"2018-12-19","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"ooo","qty":6,"price":2.8}]},{"cust_id":"1000013531859240","amount":"392.44","status":"C","price":"879.00","ord_date":"2019-02-06","items":[{"sku":"vvv","qty":7,"price":3.5},{"sku":"ccc","qty":8.5,"price":9.25}]},{"cust_id":"1000026197828546","amount":"756.25","status":"D","price":"52.00","ord_date":"2018-09-26","items":[{"sku":"mmm","qty":5,"price":2.5},{"sku":"bbb","qty":3,"price":2.55}]},{"cust_id":"1000005333616650","amount":"946.81","status":"C","price":"28.00","ord_date":"2018-12-25","items":[{"sku":"ccc","qty":8.5,"price":9.25},{"sku":"bbb","qty":3,"price":2.55}]},{"cust_id":"1000034535026552","amount":"236.57","status":"D","price":"361.00","ord_date":"2018-06-07","items":[{"sku":"mmm","qty":5,"price":2.5},{"sku":"vvv","qty":7,"price":3.5}]},{"cust_id":"1000007520688833","amount":"569.76","status":"A","price":"300.00","ord_date":"2018-12-07","items":[{"sku":"nnn","qty":5,"price":2.5},{"sku":"abc","qty":8,"price":4.5}]},{"cust_id":"1000087470755225","amount":"756.47","status":"C","price":"93.00","ord_date":"2018-11-03","items":[{"sku":"abc","qty":8,"price":4.5},{"sku":"aaa","qty":2,"price":4.55}]},{"cust_id":"1000019469536080","amount":"879.64","status":"D","price":"749.00","ord_date":"2019-01-21","items":[{"sku":"mmm","qty":5,"price":2.5},{"sku":"bbb","qty":3,"price":2.55}]},{"cust_id":"1000005333616650","amount":"305.22","status":"B","price":"438.00","ord_date":"2018-07-20","items":[{"sku":"ccc","qty":8.5,"price":9.25},{"sku":"zzz","qty":5,"price":2.75}]},{"cust_id":"1000049994651679","amount":"575.64","status":"D","price":"193.00","ord_date":"2019-01-24","items":[{"sku":"ccc","qty":8.5,"price":9.25},{"sku":"mmm","qty":5,"price":2.5}]},{"cust_id":"1000051006961168","amount":"917.15","status":"D","price":"155.00","ord_date":"2018-12-05","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"abc","qty":8,"price":4.5}]},{"cust_id":"1000078521055787","amount":"940.48","status":"D","price":"868.00","ord_date":"2018-06-02","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"aaa","qty":2,"price":4.55}]},{"cust_id":"1000018309975267","amount":"471.83","status":"D","price":"44.00","ord_date":"2018-04-16","items":[{"sku":"bbb","qty":3,"price":2.55},{"sku":"mmm","qty":5,"price":2.5}]},{"cust_id":"1000005333616650","amount":"256.40","status":"E","price":"152.00","ord_date":"2018-05-30","items":[{"sku":"abc","qty":8,"price":4.5},{"sku":"nnn","qty":5,"price":2.5}]},{"cust_id":"1000030230335919","amount":"625.32","status":"A","price":"551.00","ord_date":"2018-06-27","items":[{"sku":"abc","qty":8,"price":4.5},{"sku":"zzz","qty":5,"price":2.75}]},{"cust_id":"1000041340644158","amount":"352.92","status":"D","price":"965.00","ord_date":"2018-06-26","items":[{"sku":"mmm","qty":5,"price":2.5},{"sku":"aaa","qty":2,"price":4.55}]},{"cust_id":"1000032804457354","amount":"606.53","status":"D","price":"765.00","ord_date":"2018-12-26","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000054017086275","amount":"20.40","status":"A","price":"757.00","ord_date":"2018-12-06","items":[{"sku":"vvv","qty":7,"price":3.5},{"sku":"ooo","qty":6,"price":2.8}]},{"cust_id":"1000005333616650","amount":"416.12","status":"B","price":"447.00","ord_date":"2018-09-01","items":[{"sku":"abc","qty":8,"price":4.5},{"sku":"vvv","qty":7,"price":3.5}]},{"cust_id":"1000003334623361","amount":"969.12","status":"C","price":"340.00","ord_date":"2018-09-31","items":[{"sku":"vvv","qty":7,"price":3.5},{"sku":"ccc","qty":8.5,"price":9.25}]},{"cust_id":"1000063791355275","amount":"804.13","status":"E","price":"472.00","ord_date":"2018-12-19","items":[{"sku":"nnn","qty":5,"price":2.5},{"sku":"nnn","qty":5,"price":2.5}]},{"cust_id":"1000099054128431","amount":"58.69","status":"B","price":"45.00","ord_date":"2018-05-24","items":[{"sku":"abc","qty":8,"price":4.5},{"sku":"zzz","qty":5,"price":2.75}]},{"cust_id":"1000061031825918","amount":"92.99","status":"D","price":"18.00","ord_date":"2018-12-26","items":[{"sku":"bbb","qty":3,"price":2.55},{"sku":"ccc","qty":8.5,"price":9.25}]},{"cust_id":"1000005333616650","amount":"525.55","status":"D","price":"905.00","ord_date":"2019-02-12","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"abc","qty":8,"price":4.5}]},{"cust_id":"1000050453211901","amount":"93.70","status":"C","price":"845.00","ord_date":"2018-11-31","items":[{"sku":"mmm","qty":5,"price":2.5},{"sku":"zzz","qty":5,"price":2.75}]},{"cust_id":"1000031834859755","amount":"929.72","status":"E","price":"306.00","ord_date":"2018-05-11","items":[{"sku":"zzz","qty":5,"price":2.75},{"sku":"bbb","qty":3,"price":2.55}]},{"cust_id":"1000031442473605","amount":"841.95","status":"A","price":"524.00","ord_date":"2018-11-07","items":[{"sku":"aaa","qty":2,"price":4.55},{"sku":"nnn","qty":5,"price":2.5}]},{"cust_id":"1000005280452338","amount":"80.41","status":"B","price":"97.00","ord_date":"2018-12-12","items":[{"sku":"zzz","qty":5,"price":2.75},{"sku":"nnn","qty":5,"price":2.5}]},{"cust_id":"1000005333616650","amount":"618.55","status":"D","price":"399.00","ord_date":"2018-05-18","items":[{"sku":"nnn","qty":5,"price":2.5},{"sku":"mmm","qty":5,"price":2.5}]},{"cust_id":"1000070330161131","amount":"602.07","status":"D","price":"887.00","ord_date":"2018-12-05","items":[{"sku":"bbb","qty":3,"price":2.55},{"sku":"bbb","qty":3,"price":2.55}]},{"cust_id":"1000051291595144","amount":"618.30","status":"D","price":"836.00","ord_date":"2018-06-29","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"ooo","qty":6,"price":2.8}]},{"cust_id":"1000097765379265","amount":"646.55","status":"A","price":"106.00","ord_date":"2018-08-22","items":[{"sku":"nnn","qty":5,"price":2.5},{"sku":"mmm","qty":5,"price":2.5}]},{"cust_id":"1000001684376045","amount":"198.78","status":"A","price":"755.00","ord_date":"2019-01-05","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000005333616650","amount":"741.23","status":"B","price":"739.00","ord_date":"2018-05-16","items":[{"sku":"ccc","qty":8.5,"price":9.25},{"sku":"ooo","qty":6,"price":2.8}]},{"cust_id":"1000081091318115","amount":"494.21","status":"A","price":"299.00","ord_date":"2018-05-26","items":[{"sku":"nnn","qty":5,"price":2.5},{"sku":"mmm","qty":5,"price":2.5}]},{"cust_id":"1000015494543162","amount":"507.30","status":"D","price":"61.00","ord_date":"2018-08-19","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"abc","qty":8,"price":4.5}]},{"cust_id":"1000046208291719","amount":"356.23","status":"E","price":"171.00","ord_date":"2018-10-13","items":[{"sku":"vvv","qty":7,"price":3.5},{"sku":"ooo","qty":6,"price":2.8}]},{"cust_id":"1000071465078159","amount":"309.76","status":"E","price":"256.00","ord_date":"2018-07-31","items":[{"sku":"abc","qty":8,"price":4.5},{"sku":"mmm","qty":5,"price":2.5}]},{"cust_id":"1000005333616650","amount":"933.33","status":"E","price":"418.00","ord_date":"2018-05-11","items":[{"sku":"zzz","qty":5,"price":2.75},{"sku":"nnn","qty":5,"price":2.5}]},{"cust_id":"1000031075576069","amount":"160.09","status":"E","price":"983.00","ord_date":"2018-10-10","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"ccc","qty":8.5,"price":9.25}]},{"cust_id":"1000011933188945","amount":"671.03","status":"A","price":"335.00","ord_date":"2018-04-02","items":[{"sku":"bbb","qty":3,"price":2.55},{"sku":"ccc","qty":8.5,"price":9.25}]},{"cust_id":"1000048901589506","amount":"841.52","status":"C","price":"801.00","ord_date":"2018-11-08","items":[{"sku":"ccc","qty":8.5,"price":9.25},{"sku":"aaa","qty":2,"price":4.55}]},{"cust_id":"1000053363974267","amount":"743.05","status":"B","price":"996.00","ord_date":"2018-08-20","items":[{"sku":"ccc","qty":8.5,"price":9.25},{"sku":"ccc","qty":8.5,"price":9.25}]},{"cust_id":"1000005333616650","amount":"556.84","status":"D","price":"747.00","ord_date":"2018-08-03","items":[{"sku":"ppp","qty":7,"price":3.5},{"sku":"ooo","qty":6,"price":2.8}]},{"cust_id":"1000013148422622","amount":"398.27","status":"B","price":"310.00","ord_date":"2019-03-03","items":[{"sku":"zzz","qty":5,"price":2.75},{"sku":"zzz","qty":5,"price":2.75}]},{"cust_id":"1000080657769215","amount":"110.12","status":"A","price":"715.00","ord_date":"2019-01-32","items":[{"sku":"vvv","qty":7,"price":3.5},{"sku":"vvv","qty":7,"price":3.5}]},{"cust_id":"1000036862246139","amount":"512.77","status":"B","price":"893.00","ord_date":"2018-09-28","items":[{"sku":"ooo","qty":6,"price":2.8},{"sku":"ppp","qty":7,"price":3.5}]},{"cust_id":"1000006936795682","amount":"958.32","status":"C","price":"124.00","ord_date":"2018-04-10","items":[{"sku":"nnn","qty":5,"price":2.5},{"sku":"ccc","qty":8.5,"price":9.25}]}];

for (let i = 0; i < 100; i ++) {
    db.ordersv2.insertOne({
        _id: new ObjectId(),
        cust_id: orders[i].cust_id,
        amount: Number(orders[i].amount),
        status: orders[i].status,
        price: Number(orders[i].price),
        ord_date: new ISODate(orders[i].ord_date),
        items: orders[i].items
    });
}