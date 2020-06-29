class CalendarView {
  constructor() {
    this.backButton = document.getElementById("ym-back");
    this.nextButton = document.getElementById("ym-next");

    this.monthSelector = document.getElementById("month-selector");
    this.yearSelector = document.getElementById("year-selector");

    this.dayButtons = document.querySelectorAll("#date-list button");

    this.camSelector = document.querySelector("#cam-wrapper select");
    this.searchButton = document.getElementById("search-btn");

    const monthList = CalendarModel.monthList;
    for (let i in monthList) {
      let option = document.createElement("option");
      option.innerHTML = monthList[i];
      this.monthSelector.appendChild(option);
    }

    const yearList = CalendarModel.yearList;
    for (let i in yearList) {
      let option = document.createElement("option");
      option.innerHTML = yearList[i];
      this.yearSelector.appendChild(option);
    }
  }

  set camList(cams) {
    for(let i in cams) {
      let option = document.createElement("option");
      option.innerHTML = cams[i];
      this.camSelector.appendChild(option);
    }
  }

  deselect() {
    let selecteBtn = document.getElementById("selected-date");
    if (selecteBtn != null) {
      selecteBtn.removeAttribute("id");
    }
  }

  select(btn) {
    btn.setAttribute("id", "selected-date");
  }

  updateCalendar(datesInfo) {
    this.deselect();

    for (let i = 0; i < this.dayButtons.length; ++i) {
      let btn = this.dayButtons[i];
      let btnClasses = btn.classList;
      const dInfo = datesInfo[i];

      if (dInfo.selected != null) {
        const slt = dInfo.selected;
        this.select(btn);
        this.updateSelectResult(dInfo.value,
          slt.firstWeekday, slt.selectedYear, slt.selectedMonth);
      }

      btnClasses.remove("tagged");
      btnClasses.remove("valid");

      if (dInfo.tagged) {
        btnClasses.add("tagged");
      }

      if (!isNaN(parseInt(dInfo.value))) {
        btnClasses.add("valid");
        btn.disabled = false;
      }
      else {
        btn.disabled = true;
      }

      btn.innerHTML = dInfo.value;
    }
  }

  updateSelectResult(val, fWeekday, sYear, sMonth) {
    const date = parseInt(val);
    const sWeekday = (fWeekday + date - 1) % 7;

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];
    const fullMonths = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    document.getElementById("weekday-tag").innerHTML = weekdays[sWeekday];
    document.getElementById("month-tag").innerHTML = fullMonths[sMonth];
    document.getElementById("date-tag").innerHTML = date;
    document.getElementById("year-tag").innerHTML = sYear;
  }
}
