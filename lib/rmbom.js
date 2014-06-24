#! /usr/bin/env node

'use strict';

var userArgs = process.argv.slice(2);

var fs = require('fs');
var stripBom = require('strip-bom');
var dive = require('dive');
var mkdirp = require('mkdirp');
var path = require('path');

var srcPath = path.normalize(userArgs[0]),
	distPath = path.normalize(userArgs[1]),
	newPath;

dive(userArgs[0], { directories: false, files: true }, function(err, file) {
	newPath = distPath + file.replace(srcPath, '');

	var stream = fs.createReadStream(file).pipe(stripBom.stream());

	mkdirp.sync(path.dirname(newPath));

	stream.pipe(fs.createWriteStream(newPath));
});

console.log('DONE!');