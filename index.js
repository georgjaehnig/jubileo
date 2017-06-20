'use strict'

var born = new Date(1980, 2, 20);

var jubilees = {};

var days = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,10000,
	         11000,12000,13000,14000,15000,16000,17000,18000,19000,20000,
	         21000,22000,23000,24000,25000,26000,27000,28000,29000,30000];
for (var day of days) {
	//var period = zero;
	var jubilee = new Date(born);
	jubilee.setDate(jubilee.getDate() + day);
	jubilees[jubilee.getTime()] = day + ' days';
}

//var jubilees = {};
var months = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 750, 800, 850, 900, 950, 1000];
for (var month of months) {
	//var period = zero;
	var jubilee = new Date(born);
	jubilee.setMonth(jubilee.getMonth() + month);
	jubilees[jubilee.getTime()] = month + ' months';
}

var jubileeTimes = Object.keys(jubilees).sort(function (a, b) {  return a - b;  });

for (var jubileeTime of jubileeTimes) {
	var jubilee = new Date();
	jubilee.setTime(jubileeTime);
	console.log(jubilee.toDateString(), jubilees[jubileeTime]);
}
