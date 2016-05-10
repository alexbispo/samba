#! /usr/bin/env node
'use strict';

var Worker = require('../lib/worker');

var args = process.argv.splice(2);
console.log(args);

var fileName = args[0];
var tagArgs = args.splice(1);
console.log(tagArgs);

var worker = new Worker(fileName, tagArgs);

worker.build();
