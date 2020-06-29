let myapp = (function () {

  let calendar, timeline;

  return {
    run: function() {
      timeline
        = new TimelineController(new TimelineModel(), new TimelineView());
      calendar
        = new CalendarController(new CalendarModel(), new CalendarView(), timeline);
    }
  };
}) ();

window.addEventListener("load", function() {
  myapp.run();
});
