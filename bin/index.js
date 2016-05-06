#! /usr/bin/env node

var bigXml = require('big-xml');
var xlsx = require('xlsx-writestream');

var arguments = process.argv.splice(2);
console.log(arguments);

var fileName = arguments[0];
var tagArgs = arguments.splice(1);
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
    // TODO ...
    coluna[record.tag] = record.tag;
    
    console.log(record);
});

reader.on('end', function(){
    //console.log(colunas);
    /*console.log("Criando xlsx...");
    xlsx.write('teste.xlsx', records, function(err){
        console.log("Ocorreu um erro: " + err);
    });*/
});

