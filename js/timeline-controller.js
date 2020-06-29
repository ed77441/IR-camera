class TimelineController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.modalCloseBtn.addEventListener("click", () => view.closeModal());
    view.modalBackBtn.addEventListener("click", () => this.previousImageAction());
    view.modalNextBtn.addEventListener("click", () => this.nextImageAction());
  }

  resizeAction() {
    let model = this.model, view = this.view;
    const viewWidth = view.currentViewWidth;
    if (view.chartTab != undefined &&
          view.tabIsActive(view.chartTab)) {
      if (viewWidth != model.previousViewWidth) {
        view.redrawChart("Title", viewWidth, model.imageData);
        model.previousViewWidth = viewWidth;
      }
    }
    else {
      window.removeEventListener("resize", this.resizeAction) ;
    }
  }

  toggleCapturedBoxAction(n, btn, div) {
    let self = this;
    return function() {
      self.model.toggleArray[n] = !self.model.toggleArray[n];
      self.view.toggleCapturedBox(btn, div);
    };
  }

  openModalAction(event) {
    let model = this.model, view = this.view;
    let img = event.target || event.srcElement;
    const srcList = view.getSiblings(img).map((sib) => sib.src);
    const index = srcList.indexOf(img.src);

    model.modalArray = srcList;
    model.modalIndex = index;
    this.setUpModal();
    view.openModal();
  }

  previousImageAction() {
    let model = this.model, view = this.view;
    const index = --model.modalIndex;
    this.setUpModal();
  }

  nextImageAction() {
    let model = this.model, view = this.view;
    const index = ++model.modalIndex;
    this.setUpModal();
  }

  setUpModal() {
    let model = this.model, view = this.view;
    const index = this.model.modalIndex;
    view.setModalBtn(!(index == 0),
        !(index == this.model.modalArray.length - 1));
    view.updateModal(model.modalArray[index], model.modelCaption);
  }

  setUpTimeline(cam, year, month, date) {
    let model = this.model, view = this.view, self = this;
    const args = "cam=" + cam + "&y=" + year +
          "&m=" + month + "&d=" + date;

    let callback = function(imageInfos) {

      model.checkSearchYMD(year, month, date);
      model.imageData = imageInfos.data;
      view.updateTimeline(imageInfos.prefix,
          model.imageData, model.toggleArray, model.activeTab);
      let pairList = view.btnCaptureBoxList;
      let imageList = view.captureImages;
      let imageTab = view.imageTab;
      let chartTab = view.chartTab;

      for (let i in pairList) {
        let btn = pairList[i].btn;
        let captureBox = pairList[i].captured;
        btn.addEventListener("click",
          self.toggleCapturedBoxAction(i, btn, captureBox));
      }

      for (let i in imageList) {
        let img = imageList[i];
        img.addEventListener("click",
          (event) => self.openModalAction(event));
      }

      if (imageTab != undefined && chartTab != undefined) {
        imageTab.addEventListener("click",
              () => self.clickImageTabAction(imageTab));
        chartTab.addEventListener("click", () => self.clickChartTabAction(chartTab));
        if (model.activeTab == "chart") {
          self.clickChartTabAction(chartTab);
        }
      }
    };

    queryServer("images", args, callback);
  }

  clickImageTabAction(imageTab) {
    this.view.activateTab("timeline-tabs", imageTab)
    this.model.activeTab = "image";
  }

  clickChartTabAction(chartTab) {
    let self = this, view = this.view, model = this.model;
    const initWidth = view.currentViewWidth;
    model.activeTab = "chart";
    view.activateTab("timeline-tabs", chartTab);
    model.previousViewWidth = initWidth;
    if (!model.imageDataIsTheSame()) {
      view.redrawChart("title", initWidth, model.imageData);
      model.previousImageData = model.imageData;
    }
    window.onresize = () => self.resizeAction();
  }
}
