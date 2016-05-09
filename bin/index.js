#! /usr/bin/env node

var bigXml = require('big-xml');
var xlsx = require('xlsx-writestream');

var args = process.argv.splice(2);
console.log(args);

var fileName = args[0];
var tagArgs = args.splice(1);
console.log(tagArgs);

var tags = ["^("];

tagArgs.forEach(function(tag, index, array){
    tags.push(tag);
    if(index < (array.length - 1)){
        tags.push("|");
    }
});

tags.push(")");

console.log(tags.join(""));

var reader = bigXml.createReader(fileName, tags.join(""), {});

var colunas = [];

reader.on('record', function(record){
    var coluna = {};
    
    Object.getOwnPropertyNames(record.attrs).forEach(function(p){
        coluna[p] = record.attrs[p];
    });
    
    record.children.forEach(function(child){
        coluna[child.tag] = child.text;
    });
    
    colunas.push(coluna);
});

reader.on('end', function(){
    console.log("building xlsx...");
    xlsx.write('teste.xlsx', colunas, function(err){
        if(err){
            console.log(err);    
        }
    });
    console.log("xlsx builded...");
});

