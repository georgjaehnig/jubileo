$(document).ready(function () {
  var name = getSearchParams('name');
  if (name) {
    $('#name').val(name);
  }
  var locale = getSearchParams('locale');
  if (locale) {
    $('#locale').val(locale);
  }
  var dateString = getSearchParams('date');
  if (!isNaN(Date.parse(dateString))) {
    var date = new Date(dateString);
    var dateISOSubString = date.toISOString().substring(0,10);
    $('#born').val(dateISOSubString);
  }
  update();
});


function update() {
  var locale = $('#locale').val();
  moment.locale(locale);
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
      jubileesOfYearHTML += '<li><span class="date">' + moment(jubilee).format('D MMM') + '</span> <span class="description">' + jubileesPerYear[year][jubileeTime]+ '</span></li>';
    }
    jubileesOfYearHTML += '</li>';
    $('ul.jubilees').append($(jubileesOfYearHTML));
  }
  var name = $('#name').val();
  $('h2.name').html(name);
  var bornOutput = moment(born).format('LL');
  $('h3.born').html(bornOutput);
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

  var locale = moment.locale(); 

	var units = {
		'de': {
			'days': 'Tage',
			'weeks': 'Wochen',
			'months': 'Monate',
			'hours': 'Stunden',
			'minutes': 'Minuten',
		},
		'en': {
			'days': 'days',
			'weeks': 'weeks',
			'months': 'months',
			'hours': 'hours',
			'minutes': 'minutes',
		},
		'pl': {
			'days': 'dni',
			'weeks': 'tygodni',
			'months': 'miesięcy',
			'hours': 'godzin',
			'minutes': 'minut',
		},
		'eo': {
			'days': 'tagoj',
			'weeks': 'semajnoj',
			'months': 'monatoj',
			'hours': 'horoj',
			'minutes': 'minutoj',
		},
	}

  var jubilees = {};
  
  var days = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
              250, 750,
              123,
              111, 222, 333, 444, 555, 666, 777, 888,
              1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,10000,
             11000,12000,13000,14000,15000,16000,17000,18000,19000,20000,
             21000,22000,23000,24000,25000,26000,27000,28000,29000,30000,
              1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 
             11111,22222,
             1234, 12345];
  var weeks = [50, 100, 150, 200, 250, 300, 400, 500, 600, 750, 800, 900, 1000,
              1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,
              2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,
              3100,3200,3300,3400,3500,3600,3700,3800,3900,4000,
              111,222,333,444,555,666,777,888,
              1111,2222,3333];
  var months = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 750, 800, 850, 900, 950, 1000,
                111,222,333,444,555,666,777,888];
  // Add day jubilees.
  for (var day of days) {
    var jubilee = new Date(born);
    jubilee.setDate(jubilee.getDate() + day);
    jubilees[jubilee.getTime()] = day + ' ' + units[locale]['days'];
  }
  
  // Add week jubilees.
  for (var week of weeks) {
    var jubilee = new Date(born);
    jubilee.setDate(jubilee.getDate() + week * 7);
    jubilees[jubilee.getTime()] = week + ' ' + units[locale]['weeks'];
  }
  
  // Add month jubilees.
  for (var month of months) {
    var jubilee = new Date(born);
    jubilee.setMonth(jubilee.getMonth() + month);
    jubilees[jubilee.getTime()] = month + ' ' + units[locale]['months'];
  }

  return jubilees;

  // Not implemented for now.

  var jubilees = {};
	// 80 years max:
	// 750 000 hours
	// 50 000 000 minutes
  // Add hour jubilees.
  var hours = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 
               11111, 22222, 33333, 44444, 55555, 66666, 77777, 88888, 99999, 111111,
		           100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000,
	              ];
  for (var hour of hours) {
    var jubilee = new Date(born);
    jubilee.setHours(jubilee.getHours() + hour);
    jubilees[jubilee.getTime()] = hour + ' ' + units[locale]['hours'];
  }

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
