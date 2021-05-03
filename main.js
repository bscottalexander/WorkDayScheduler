function addCalendarHours() {
  let hours;

  if (window.localStorage.getItem('data')) {
    hours = JSON.parse(window.localStorage.getItem('data'));
  } else {
    hours = [
      {hour: "9AM", note: ""},
      {hour: "10AM", note: ""},
      {hour: "11AM", note: ""},
      {hour: "12PM", note: ""},
      {hour: "1PM", note: ""},
      {hour: "2PM", note: ""},
      {hour: "3PM", note: ""},
      {hour: "4PM", note: ""},
      {hour: "5PM", note: ""},
    ];
  }

  const m = moment();

  $('#date').text(m.format('dddd, MMMM Do'))
 
  hours.forEach(function(hour) {
    let color = 'gray';
    const time = moment(hour.hour, 'ha');

    if (time.isSame(m, 'hour')) {
        color = '#FF4C4C';
    } else if (time.isAfter(m, 'hour')) {
        color = '#4CA64C';
    }

    const calendarItem = $('<div class="flex calendar-item"></div>');
    const calendarHour = $('<div class="flex flex-horizontal-end hour"></div>');
    const input = $('<textarea class="form-control flex-grow">' + hour.note + '</textarea>');
    const button = $('<button class="btn btn-primary"><i class="fa fa-save"></i></button>');

    button.click(function() {
      hour.note = input.val();
      window.localStorage.setItem('data', JSON.stringify(hours));
    });

    input.css('background-color', color);
    calendarHour.append('<span>' + hour.hour + '</span>')
    calendarItem.append(calendarHour);
    calendarItem.append(input);
    calendarItem.append(button);
    $('#calendar-container').append(calendarItem);

  });
}

$(document).ready(function () {
  addCalendarHours();
});
