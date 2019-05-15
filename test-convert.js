// Utility for converting jest json outputs to mocha style that is accepted by IBM
let fs = require('fs');
let data = fs.readFileSync(process.argv[2]);
let testfile = JSON.parse(data);

let tests = []
testfile['passes'].forEach(x => tests.push(x));
testfile['failures'].forEach(x => tests.push(x));

testfile['pending'] = testfile['skipped'];
delete testfile['skipped'];

testfile['tests'] = tests;

fs.writeFileSync(process.argv[3], JSON.stringify(testfile))