$(document).ready(function () {
	update();
});

function update() {
	var bornString = $('#born').val();
  var born = new Date(bornString);
	var jubilees = getJubilees(born);
	var jubileeTimes = getJubileeTimes(jubilees);
  for (var jubileeTime of jubileeTimes) {
    var jubilee = new Date();
    jubilee.setTime(jubileeTime);
		$('#jubilees').append($('<li>' + jubilee.toDateString() + ' ' + jubilees[jubileeTime]+ '</>'));
  }
}
function getJubilees(born) {

  var jubilees = {};
  
  // Add day jubilees.
  var days = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,10000,
             11000,12000,13000,14000,15000,16000,17000,18000,19000,20000,
             21000,22000,23000,24000,25000,26000,27000,28000,29000,30000,
              1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999, 
             11111,22222,
             1234, 12345];
  for (var day of days) {
    var jubilee = new Date(born);
    jubilee.setDate(jubilee.getDate() + day);
    jubilees[jubilee.getTime()] = day + ' days';
  }
  
  // Add week jubilees.
  var weeks = [50, 100, 150, 200, 250, 300, 400, 500, 600, 750, 800, 900, 1000,
              1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,
              2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,
              3100,3200,3300,3400,3500,3600,3700,3800,3900,4000];
  for (var week of weeks) {
    var jubilee = new Date(born);
    jubilee.setDate(jubilee.getDate() + week * 7);
    jubilees[jubilee.getTime()] = week + ' weeks';
  }
  
  // Add month jubilees.
  var months = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 750, 800, 850, 900, 950, 1000];
  for (var month of months) {
    var jubilee = new Date(born);
    jubilee.setMonth(jubilee.getMonth() + month);
    jubilees[jubilee.getTime()] = month + ' months';
  }
	return jubilees;
}

function getJubileeTimes(jubilees) {
  // Sort jubilees by time.
  var jubileeTimes = Object.keys(jubilees).sort(function (a, b) {  return a - b;  });
	return jubileeTimes;
}
