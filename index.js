'use strict'

var zero = new Date(0);

var born = new Date(1980, 2, 20);
var today = new Date();

var diff = new Date(today - born);

// var d = new Date();
// d.setUTCFullYear(1970);
// d.setUTCMonth(0);
// d.setDate(1);

var d = zero;
d.setDate(d.getDate()+20000);

var jubilee = new Date(born.getTime() + d.getTime());

console.log(jubilee.toDateString());

var jubilees = {};

var days = [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000,20000];

for (var day of days) {
	console.log(day);
}

//console.log(diff.getFullYear() - 1970);
//console.log(zero.getTime());
//console.log(born.getTime());


