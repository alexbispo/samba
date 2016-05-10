'use strict';

/*
 *Libraries
 */
var bigXml = require('big-xml');
var xlsx = require('xlsx-writestream');

class Worker{
	
	constructor(xmlPath, rootTags, xlsxPath){
		this.xmlPath = xmlPath || "";
		this.rootTags = rootTags || [];
		this.xlsxPath = xlsxPath || this.xmlPath.replace(/.xml/, ".xlsx"); 
	}
	
	build(){
		var _this = this;
		var tags = ["^("];

		this.rootTags.forEach(function(tag, index, array){
			tags.push(tag);
			if(index < (array.length - 1)){
				tags.push("|");
			}
		});
		
		tags.push(")$");
		
		var reader = bigXml.createReader(this.xmlPath, tags.join(""), {});
		
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
			xlsx.write(_this.xlsxPath, colunas, function(err){
				if(err){
					console.log(err);    
				}
			});
		});
	}
	
}

module.exports = Worker;