class CalendarController {
  constructor(model, view, childController) {
    this.model = model;
    this.view = view;
    this.childController = childController;
    let self = this;

    view.backButton.addEventListener("click", () => self.backAction());
    view.nextButton.addEventListener("click", () => self.nextAction());

    view.monthSelector.addEventListener("change", () => self.selectMonthAction());
    view.yearSelector.addEventListener("change", () => self.selectYearAction());

    view.dayButtons.forEach(function(button, index) {
      button.addEventListener("click", () => self.selectDateAction(event));
    });

    view.camSelector.addEventListener("change", () => self.selectCamAction());
    view.searchButton.addEventListener("click", () => self.searchImageAction());

    queryServer("cams", "", function (cams) {
      model.selectedCam = cams[0];
      view.camList = cams;
      self.setUpCalendar();
      self.searchImageAction();
      setInterval(() => self.queryImageAction(), 5000);
    });

    this.setUpPageRefresher();
  }

  setUpPageRefresher() {
    const now = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(1);
    setTimeout(() => location.reload(),
        tomorrow.getTime() - now.getTime());
  }

  queryImageAction() {
    const today = new Date();
    let model = this.model;
    if (today.getFullYear() == this.model.searchYear &&
        today.getMonth() == this.model.searchMonth &&
        today.getDate() == this.model.searchDate) {
      this.childController.setUpTimeline(model.searchCam, model.searchYear,
                model.searchMonth + 1, model.searchDate);
    }
  }

  nextAction() {
    this.model.incCurrentMonth();
    this.setUpCalendar();
  }

  backAction() {
    this.model.decCurrentMonth();
    this.setUpCalendar();
  }

  selectDateAction(event) {
    let model = this.model, view = this.view;
    let btn = event.target || event.srcElement;
    const btnContent = btn.innerHTML;
    if (!isNaN(parseFloat(btnContent))
        && isFinite(btnContent)) {
      const selectedDate = parseInt(btnContent);

      model.selectedYear = model.currentYear;
      model.selectedMonth = model.currentMonth;
      model.selectedDate = selectedDate;

      view.deselect();
      view.select(btn);
      view.updateSelectResult(selectedDate,
        model.firstWeekday, model.selectedYear, model.selectedMonth);
    }
  }

  selectMonthAction() {
    this.model.currentMonth = this.view.monthSelector.selectedIndex;
    this.setUpCalendar();
  }

  selectYearAction() {
    this.model.currentYear = parseInt(this.view.yearSelector.value);
    this.setUpCalendar();
  }

  selectCamAction() {
    this.model.selectedCam = this.view.camSelector.value;
    this.model.reset();
    this.setUpCalendar();
  }

  searchImageAction() {
    let model = this.model, view = this.view;
    model.searchYear = model.selectedYear;
    model.searchMonth = model.selectedMonth;
    model.searchDate = model.selectedDate;
    model.searchCam = model.selectedCam;
    this.childController.setUpTimeline(model.selectedCam, model.selectedYear,
          model.selectedMonth + 1, model.selectedDate);
  }

  setUpCalendar() {
    let model = this.model, view = this.view;
    const args = "cam=" + model.selectedCam + "&y=" + model.currentYear +
          "&m=" + (model.currentMonth + 1);

    queryServer("tags", args, function(tags) {
      let intTags = [];
      for (let i in tags) {
        intTags.push(parseInt(tags[i]));
      }

      view.yearSelector.value = model.currentYear;
      view.monthSelector.value = CalendarModel.monthList[model.currentMonth];
      view.updateCalendar(model.generateCalendarInfo(intTags));
    });
  }
}
