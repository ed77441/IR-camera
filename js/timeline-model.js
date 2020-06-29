class TimelineModel {
  constructor() {
    this.modalArray = [];
    this.modalIndex = 0;
    this.imageData = null;
    this.previousImageData = null;
    this.pYear = -1;
    this.pMonth = -1;
    this.pDate = -1;
    this.toggleArray = [];
    this.previousViewWidth = 0;
    this.activeTab = "";
  }

  get modelCaption() {
    const src = this.modalArray[this.modalIndex];
    const splited = src.split("/").slice(4);
    let caption = splited[0] + "  "
      + splited[1] + "-" + splited[2] + "  "
      + splited[3] + ":" + splited[4].substring(0, 5);

    return caption;
  }

  checkSearchYMD(y, m, d) {
    if (this.pYear != y ||
        this.pMonth != m ||
        this.pDate != d) {
      this.toggleArray = [];
      this.pYear = y;
      this.pMonth = m;
      this.pDate = d;
      this.activeTab = "image";
    }
  }

  imageDataIsTheSame() {
    return JSON.stringify(this.imageData)
      === JSON.stringify(this.previousImageData);
  }
}
