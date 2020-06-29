class CalendarModel {
  constructor() {
    this.firstWeekday = 0;
    this.selectedCam = "#";
    this.searchYear = -1;
    this.searchMonth = -1;
    this.searchDate = -1;
    this.searchCam = "";
    this.reset();
  }

  reset() {
    const today = new Date();
    this.currentYear = this.selectedYear = today.getFullYear();
    this.currentMonth = this.selectedMonth = today.getMonth();
    this.selectedDate = today.getDate();
  }

  static get yearList() {
    let yl = [];
    const lastOne = new Date().getFullYear() + 5;

    for (let i = 2010; i < lastOne; ++i) {
      yl.push(i);
    }

    return yl;
  }

  static get monthList() {
    return ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
         "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  }

  incCurrentMonth() {
    const lastOption =
      CalendarModel.yearList[CalendarModel.yearList.length - 1];

    const preMonth = this.currentMonth;
    const preYear = this.currentYear;

    this.currentMonth += 1;
    if (this.currentMonth > 11) {
      this.currentYear += 1;
      this.currentMonth = 0;
    }

    if (lastOption < this.currentYear) {
      this.currentMonth = preMonth;
      this.currentYear = preYear;
    }
  }

  decCurrentMonth () {
    const firstOption = CalendarModel.yearList[0];
    const preMonth = this.currentMonth;
    const preYear = this.currentYear;

    this.currentMonth -= 1;
    if (this.currentMonth < 0) {
      this.currentYear -= 1;
      this.currentMonth = 11;
    }

    if (firstOption > this.currentYear) {
      this.currentMonth = preMonth;
      this.currentYear = preYear;
    }
  }

  generateCalendarInfo(tags) {
    const fWeekday = this.firstWeekday =
      new Date(this.currentYear, this.currentMonth, 1).getDay();
    const length =
      new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    let result = [];
    let dateCount = 1;

    for (let i = 0; i < 37; ++i) {
      let dInfo = {
        selected: null,
        tagged: false,
        value: "&nbsp;"
      };

      if (i >= fWeekday &&
          i < fWeekday + length) {
        dInfo.value = dateCount;
        dInfo.tagged = tags.includes(dateCount);
        dateCount++;
      }

      result.push(dInfo);
    }

    if (this.currentYear == this.selectedYear &&
        this.currentMonth == this.selectedMonth) {
      let dInfo = result[fWeekday + this.selectedDate - 1];
      dInfo.selected = {
        firstWeekday: fWeekday,
        selectedYear: this.selectedYear,
        selectedMonth: this.selectedMonth
      };
    }

    return result;
  }
}
