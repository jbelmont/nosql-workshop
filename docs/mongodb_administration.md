NoSQL Workshop - Mongo Administration

## Sections:

* [Production Notes](#production-notes)
* [Operations Checklist](#operations-checklist)
* [Development Checklist](#development-checklist)
* [Performance](#performance)
* [Configuration and Maintenance](#configuration-and-maintenance)
* [Data Center Awareness](#data-center-awareness)
* [MongoDB Backup Methods](#mongodb-backup-methods)
* [Monitoring for MongoDB](#monitoring-for-mongodb)
* [Personal Notes on MongoDB Administration](#personal-notes-on-mongodb-administration)
* [Bread Crumb Navigation](#bread-crumb-navigation)

###### Production Notes

Please read the official [Production Notes document](https://docs.mongodb.com/manual/administration/production-notes/)

###### Operations Checklist

Please read the official [Operations Checklist document](https://docs.mongodb.com/manual/administration/production-checklist-operations/)

###### Development Checklist

Please read the official [Development Checklist document](https://docs.mongodb.com/manual/administration/production-checklist-development/)

###### Performance

Please read the official [Performance document](https://docs.mongodb.com/manual/administration/analyzing-mongodb-performance/)

###### Configuration and Maintenance

Please read the official [Configuration and Maintenance document](https://docs.mongodb.com/manual/administration/configuration-and-maintenance/)

###### Data Center Awareness

Please read the official [Data Center Awareness document](https://docs.mongodb.com/manual/data-center-awareness/)

###### MongoDB Backup Methods

Please read the official [MongoDB Backup Methods document](https://docs.mongodb.com/manual/core/backups/)

###### Monitoring for MongoDB

Please read the official [Monitoring for MongoDB document](https://docs.mongodb.com/manual/administration/monitoring/)

###### Personal Notes on MongoDB Administration

Let us create json file to get performance metrics in mongodb

```bash
mongoperf --help
mongoperf

usage:

  mongoperf < myjsonconfigfile

  {
    nThreads:<n>,     // number of threads (default 1)
    fileSizeMB:<n>,   // test file size (default 1MB)
    sleepMicros:<n>,  // pause for sleepMicros/nThreads between each operation (default 0)
    mmf:<bool>,       // if true do i/o's via memory mapped files (default false)
    r:<bool>,         // do reads (default false)
    w:<bool>,         // do writes (default false)
    recSizeKB:<n>,    // size of each write (default 4KB)
    syncDelay:<n>     // secs between fsyncs, like --syncdelay in mongod. (default 0/never)
  }

mongoperf is a performance testing tool. the initial tests are of disk subsystem performance;
  tests of mongos and mongod will be added later.
most fields are optional.
non-mmf io is direct io (no caching). use a large file size to test making the heads
  move significantly and to avoid i/o coalescing
mmf io uses caching (the file system cache).
```

We are going to add the following json config file:

```json
{ recSizeKB: 8, nThreads: 12, fileSizeMB: 10000, r: true, mmf: false }
```

Let us run a mongo perf test:

```bash
mongoperf < perf.json
mongoperf
use -h for help
parsed options:
{ recSizeKB: 8, nThreads: 12, fileSizeMB: 10000, r: true, mmf: false }
creating test file size:10000MB ...
1GB...
2GB...
3GB...
4GB...
5GB...
6GB...
7GB...
8GB...
9GB...
testing...
optoins:{ recSizeKB: 8, nThreads: 12, fileSizeMB: 10000, r: true, mmf: false }
wthr 12
new thread, total running : 1
read:1 write:0
201 ops/sec 0 MB/sec
346 ops/sec 1 MB/sec
308 ops/sec 1 MB/sec
314 ops/sec 1 MB/sec
335 ops/sec 1 MB/sec
195 ops/sec 0 MB/sec
320 ops/sec 1 MB/sec
320 ops/sec 1 MB/sec
new thread, total running : 2
read:1 write:0
677 ops/sec 2 MB/sec
738 ops/sec 2 MB/sec
692 ops/sec 2 MB/sec
562 ops/sec 2 MB/sec
526 ops/sec 2 MB/sec
598 ops/sec 2 MB/sec
736 ops/sec 2 MB/sec
586 ops/sec 2 MB/sec
new thread, total running : 4
read:1 write:0
read:1 write:0
1252 ops/sec 4 MB/sec
1140 ops/sec 4 MB/sec
1151 ops/sec 4 MB/sec
1212 ops/sec 4 MB/sec
1051 ops/sec 4 MB/sec
1372 ops/sec 5 MB/sec
1382 ops/sec 5 MB/sec
1406 ops/sec 5 MB/sec
read:1 write:0
read:1 write:0
new thread, total running : 8
read:1 write:0
read:1 write:0
1777 ops/sec 6 MB/sec
1805 ops/sec 7 MB/sec
1859 ops/sec 7 MB/sec
1736 ops/sec 6 MB/sec
1782 ops/sec 6 MB/sec
1616 ops/sec 6 MB/sec
1658 ops/sec 6 MB/sec
2108 ops/sec 8 MB/sec
read:1 write:0
read:1 write:0
new thread, total running : 12
read:1 write:0
read:1 write:0
2181 ops/sec 8 MB/sec
2069 ops/sec 8 MB/sec
```

Now let us check the disk utilization using the `iostat` command:

```bash
iostat -mx 2
Linux 4.4.0-1088-aws (<environment>) 	09/25/2019 	_x86_64_	(4 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.64    0.24    0.97    4.10    0.55   90.50

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    1.68    0.00     0.00     0.00     2.18     0.00    2.11    2.11    0.00   0.17   0.03
loop1             0.00     0.00    5.18    0.00     0.01     0.00     2.20     0.01    2.27    2.27    0.00   0.13   0.07
loop2             0.00     0.00    5.77    0.00     0.01     0.00     2.17     0.00    0.04    0.04    0.00   0.00   0.00
loop3             0.00     0.00    1.69    0.00     0.00     0.00     2.18     0.00    0.11    0.11    0.00   0.01   0.00
xvda              0.05   104.02   11.32   84.92     0.28     7.90   174.03    10.34  107.45    7.86  120.73   1.44  13.83

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.00   27.02    0.00   72.73

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     2.00 1154.00  146.00     9.02    15.77    39.05     8.12    6.20    3.40   28.32   0.77 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.00   36.28    0.00   63.46

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 1160.00    0.50     9.06     0.01    16.01     3.99    3.42    3.43    0.00   0.86 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.00   32.66    0.13   67.09

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 1319.00    0.00    10.30     0.00    16.00     3.99    3.04    3.04    0.00   0.76 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.13   56.93    0.13   42.57

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 1525.50    0.00    11.92     0.00    16.00     4.71    3.11    3.11    0.00   0.66 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.00   91.66    0.13    8.09

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 1686.00    0.00    13.17     0.00    16.00     7.98    4.72    4.72    0.00   0.59 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.00   77.88    0.13   21.74

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 1821.00    0.00    14.23     0.00    16.00     7.98    4.34    4.34    0.00   0.55 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.00   84.28    0.00   15.59

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 1653.00    0.50    12.91     0.01    16.00     7.99    4.86    4.86    4.00   0.60 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.00   92.78    0.25    6.71

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00    21.50 2036.00    2.00    15.91     0.09    16.08     8.70    4.27    4.27    1.00   0.49 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.38    0.00    0.00   96.08    0.25    3.29

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2012.00    0.00    15.72     0.00    16.00    11.98    5.91    5.91    0.00   0.50 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.00   99.24    0.00    0.51

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2104.00    0.00    16.44     0.00    16.00    11.99    5.71    5.71    0.00   0.48 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.13   96.84    0.25    2.65

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2032.00    0.00    15.88     0.00    16.00    11.98    5.95    5.95    0.00   0.49 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.00   97.59    0.00    2.15

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 1827.00    0.50    14.27     0.01    16.00    11.98    6.50    6.50    4.00   0.55 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.51    0.00    0.00   93.79    0.25    5.45

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2322.00    0.00    18.14     0.00    16.00    11.97    5.19    5.19    0.00   0.43 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.00   99.37    0.25    0.13

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2011.50    0.00    15.71     0.00    16.00    11.98    5.96    5.96    0.00   0.50 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.13   99.49    0.13    0.13

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2180.50    0.00    17.04     0.00    16.00    11.98    5.51    5.51    0.00   0.46 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.38    0.00    0.00   99.49    0.13    0.00

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2563.00    0.50    20.02     0.00    16.00    11.98    4.63    4.63    4.00   0.39 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.00   99.62    0.25    0.00

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2147.00    0.50    16.77     0.01    16.00    11.97    5.59    5.59    4.00   0.47 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.13   99.49    0.13    0.00

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2254.00    0.00    17.61     0.00    16.00    11.98    5.34    5.34    0.00   0.44 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.00   90.71    0.13    9.03

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2414.00    0.50    18.86     0.00    16.00    11.96    4.95    4.95    4.00   0.41 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.00   98.86    0.25    0.76

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2262.00    0.00    17.67     0.00    16.00    11.97    5.28    5.28    0.00   0.44 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.00   87.09    0.13   12.66

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 1633.00    0.00    12.76     0.00    16.00    11.97    7.30    7.30    0.00   0.61 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.38    0.00    0.13   98.74    0.13    0.63

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2183.50    0.50    17.06     0.01    16.00    11.97    5.52    5.52    4.00   0.46 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.00   98.60    0.13    1.15

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     7.50 2320.50    1.50    18.13     0.04    16.02    11.97    5.17    5.17    1.33   0.43 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.51    0.00    0.13   95.96    0.25    3.16

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     3.00 2259.50   20.50    17.65     0.09    15.94    12.04    5.27    5.28    3.80   0.44 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.13   92.02    0.13    7.60

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2107.50    0.00    16.46     0.00    16.00    12.00    5.64    5.64    0.00   0.48 100.20

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.00   92.40    0.25    7.22

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2092.50    0.00    16.35     0.00    16.00    11.98    5.74    5.74    0.00   0.48 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.13   96.96    0.00    2.78

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 1948.00    0.50    15.22     0.01    16.00    11.99    6.16    6.16    4.00   0.51 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.13   73.76    0.25   25.60

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2309.50    0.00    18.04     0.00    16.00    11.99    5.18    5.18    0.00   0.43 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.00   98.22    0.13    1.40

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2150.00    0.00    16.80     0.00    16.00    11.97    5.57    5.57    0.00   0.47 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.13    0.00    0.00   98.48    0.25    1.14

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2302.00    0.00    17.98     0.00    16.00    11.98    5.24    5.24    0.00   0.43 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.38   99.11    0.13    0.13

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2141.00    1.50    16.73     0.01    16.00    11.98    5.53    5.53    0.00   0.47 100.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.25    0.00    0.13   92.89    0.13    6.60

Device:         rrqm/s   wrqm/s     r/s     w/s    rMB/s    wMB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
loop0             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop1             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop2             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
loop3             0.00     0.00    0.00    0.00     0.00     0.00     0.00     0.00    0.00    0.00    0.00   0.00   0.00
xvda              0.00     0.00 2343.00    0.50    18.30     0.01    16.01    11.97    5.09    5.09    4.00   0.43 100.00
.....................................................................................................................
```

#### Bread Crumb Navigation
_________________________

Previous | Next
:------- | ---:
← [MongoDB Sharding](./mongodb_sharding.md) | [MongoDB Storage](./mongodb_storage.md) →
