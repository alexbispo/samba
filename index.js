'use strict';

var Worker = require('./lib/worker');

module.exports = function(xmlPath, rootTags, xlsxPath) {
	var wk = new Worker(xmlPath, rootTags, xlsxPath);
	return wk;	
}
