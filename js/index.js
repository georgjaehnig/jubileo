$(document).ready(function () {
  var name = getSearchParams('name');
  $('#name').val(name);
  var dateString = getSearchParams('date');
  if (!isNaN(Date.parse(dateString))) {
    var date = new Date(dateString);
    var dateISOSubString = date.toISOString().substring(0,10);
    $('#born').val(dateISOSubString);
  }
  update();
});


function update() {
  var bornString = $('#born').val();
  var born = new Date(bornString);
  born = createDateAsUTC(born);
  var jubilees = getJubilees(born);
  var jubileeTimes = getJubileeTimes(jubilees);
  var jubileesPerYear = getJubileesPerYear(jubilees, jubileeTimes);
  $('ul.jubilees').empty();
  for (var year in jubileesPerYear) {
    var jubileesOfYearHTML = '';
    jubileesOfYearHTML += '<li class="year"><span class="year">' + year + '</span><ul class="jubilees-year list-unstyled">';
    for (var jubileeTime in jubileesPerYear[year]) {
      var jubilee = new Date();
      jubilee.setTime(jubileeTime);
      jubileesOfYearHTML += '<li><span class="date">' + (jubilee.getUTCMonth()+1) + '/' + jubilee.getUTCDate() + '</span> <span class="description">' + jubileesPerYear[year][jubileeTime]+ '</span></li>';
    }
    jubileesOfYearHTML += '</li>';
    $('ul.jubilees').append($(jubileesOfYearHTML));
  }
  var name = $('#name').val();
  $('h2.name').html(name);
  $('h3.born').html('*' + born.getFullYear() + '-' + (born.getUTCMonth()+1) + '-' + born.getDate());
}


function downloadICal() {
  var header = `BEGIN:VCALENDAR
X-WR-CALNAME:Jubilees
VERSION:2.0
`;
  var events = ``;
  var footer = `END:VCALENDAR`;
  var bornString = $('#born').val();
  var born = new Date(bornString);
  born = createDateAsUTC(born);
  var jubilees = getJubilees(born);
  var jubileeTimes = getJubileeTimes(jubilees);
  for (var jubileeTime of jubileeTimes) {
    var jubilee = new Date();
    jubilee.setTime(jubileeTime);
    var event = `BEGIN:VEVENT
DTSTART:` + jubilee.toISOString().substring(0,10).replace(/-/g, '') + `
SUMMARY:` + jubilees[jubileeTime] + `
END:VEVENT
`;
    events = events + event;
  }
  var text = header + events + footer;
  download('jubilees.ics', text);
}


// Get dates ==================================================================

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
              3100,3200,3300,3400,3500,3600,3700,3800,3900,4000,
              111,222,333,444,555,666,777,888,999,
              1111,2222,3333];
  for (var week of weeks) {
    var jubilee = new Date(born);
    jubilee.setDate(jubilee.getDate() + week * 7);
    jubilees[jubilee.getTime()] = week + ' weeks';
  }
  
  // Add month jubilees.
  var months = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 750, 800, 850, 900, 950, 1000,
                111,222,333,444,555,666,777,888,999];
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

// Returns nested object, like:
// jubileesPerYear[1980][1296435600000] = '1000 days'.
function getJubileesPerYear(jubilees, jubileeTimes) {
  var jubileesPerYear = {};
  for (var jubileeTime of jubileeTimes) {
    var jubilee = new Date();
    jubilee.setTime(jubileeTime);
    var year = jubilee.getFullYear();
    if (!(year in jubileesPerYear)) {
      jubileesPerYear[year] = {};
    }
    jubileesPerYear[year][jubileeTime] = jubilees[jubileeTime];
  }
  return jubileesPerYear;
}

// Helpers ====================================================================

// Source: https://stackoverflow.com/a/18197341/52023
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// From https://stackoverflow.com/a/26744533/52023
function getSearchParams(k){
 var p={};
 location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
 return k?p[k]:p;
}

// From: https://stackoverflow.com/a/14006555/52023
function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}
