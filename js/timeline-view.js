class TimelineView {
  constructor() {
    this.timelineWrapper = document.getElementById("timeline-wrapper");
    this.modalCloseBtn = document.getElementById("md-close");
    this.modalBackBtn = document.getElementById("md-back");
    this.modalNextBtn = document.getElementById("md-next");

    this.modal = document.getElementById("modal");
    this.modalImage = document.getElementById("modal-image");
    this.modalCaption = document.getElementById("modal-caption");
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "bar-chart");
  }

  get liTemplate() {
    const template =
      `<li {GAPCLASS}>
        <div>
          <div class="captured-header">
            <h3>Image Count: {COUNT}</h3>
            <button>
              <img src="{BUTTONICON}"></img>
            </button>
          </div>
          <div class="captured-box {OPENCLASS}">
            {CONTENT}
          </div>
        </div>
        <span class="number">
          <span>{START}:00</span>
          <span>{END}:00</span>
        </span>
      </li>`;
    return template;
  }

  get tabTemplate() {
    const template =
      `<div id="timeline-tabs" class="tab-container">
        <button id="image-tab" class="tab-item">
          Snapshot
        </button>
        <button id="chart-tab" class="tab-item">
          BarChart
        </button>
       </div>`;
     return template;
  }

  get errorTemplate() {
    const template =
      `<div id='error'>
        <h2>404</h2>
        <p>Content not found!</p>
      </div>`;
    return template;
  }

  updateTimeline(prefix, data, toggleArray, activeTab) {
    let ul = document.createElement("ul");
    ul.setAttribute("id", "timeline");
    ul.setAttribute("class", "tab-content");

    if (data.length != 0) {
      let previousTime = parseInt(Object.keys(data)[0]);
      let liList = "";
      let counter = 0;
      for (let i in data) {
        let imageDir = prefix + "/" + i + "/";
        let imageArray = data[i];
        let startTime = parseInt(i);
        let li = (' ' + this.liTemplate).slice(1);
        let imageList = "";

        li = li.replace("{COUNT}", imageArray.length);
        li = li.replace("{START}", startTime);
        li = li.replace("{END}", startTime + 1);

        const thereIsAGap = previousTime != startTime &&
              previousTime + 1 != startTime;
        const isOpened = toggleArray[counter++];
        li = li.replace("{OPENCLASS}", isOpened
                            ? "opened" : "");
        li = li.replace("{BUTTONICON}", isOpened
                            ? "/icon/minus.png" : "/icon/plus.png");
        li = li.replace("{GAPCLASS}", thereIsAGap
                            ? "class=hasGap" : "");
        previousTime = startTime;

        for (let j in imageArray) {
          imageList += "<img src='" + imageDir + imageArray[j] + "'/>";
        }

        li = li.replace("{CONTENT}", imageList);
        liList += li;
      }

      ul.innerHTML = liList;
      this.timelineWrapper.innerHTML = this.tabTemplate;

      this.timelineWrapper.appendChild(ul);
      let chartWrapper = document.createElement("div");
      chartWrapper.setAttribute("id", "chart-wrapper");
      chartWrapper.setAttribute("class", "tab-content");

      chartWrapper.appendChild(this.canvas)
      this.timelineWrapper.appendChild(chartWrapper);
      const tabs = this.timelineWrapper.getElementsByClassName("tab-item");
      let imageTab = tabs[0], chartTab = tabs[1];

      if (activeTab == "image") {
        imageTab.classList.add("active-tab");
        ul.classList.add("active-tab-content");
      }
      else {
        chartTab.classList.add("active-tab");
        chartWrapper.classList.add("active-tab-content");
      }
    }
    else {
      this.timelineWrapper.innerHTML = this.errorTemplate;
    }
  }

  get currentViewWidth () {
    return this.timelineWrapper.offsetWidth;
  }

  redrawChart(title, width, imageData) {
    if (this.myChart != undefined) {
      this.myChart.destroy();
    }

    let chart = document.getElementById("bar-chart");
    let chartType = "bar";
    let xlabel, ylabel, fontSize;
    const containerWidth = width;

    if (containerWidth < 700) {
      chartType = "horizontalBar";
      chart.width = containerWidth;
      chart.height = 600;
      fontSize = 12;
    }
    else if (containerWidth < 1130) {
      chart.width = containerWidth ;
      chart.height = 350;
      fontSize = 16;
    }
    else {
      chart.width = containerWidth;
      chart.height = 500;
      fontSize = 20;
    }

    if (containerWidth < 700) {
      xlabel = "images"; ylabel = "interval(hour)";
    }
    else {
      xlabel = "interval(hour)"; ylabel = "images";
    }

    let label = [];
    let data = new Array(24).fill(0);
    let bg = new Array(24).fill("");

    for (let i = 0; i < 24; ++i) {
      label.push(i);
    }

    for (let i in imageData) {
      let imageCount  = imageData[i].length;
      data[i] = imageCount;
      if (imageCount < 100) {
        bg[i] = 'rgba(0, 204, 0, 0.5)';
      }
      else if (imageCount < 200) {
        bg[i] = 'rgba(255, 204, 0, 0.5)';
      }
      else {
        bg[i] = 'rgba(230, 0, 0, 0.5)';
      }
    }

    var ctx = chart.getContext('2d');
    this.myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: label,
            datasets: [{
                label: "Number of captured",
                data: data,
                backgroundColor: bg,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: ylabel,
                    fontSize: fontSize
                  },
                  barPercentages: 1,
                  ticks: {
                      beginAtZero: true,
                      fontSize: fontSize - 2,
                      userCallback: function(label, index, labels) {
                        if (Math.floor(label) === label) {
                            return label;
                        }
                      }
                  },
                  barThickness: 12,
                  maxBarThickness: 12
                }],
                xAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: xlabel,
                    fontSize: fontSize
                  },
                  ticks: {
                    fontSize: fontSize - 2,
                  }
                }]
            },
            maintainAspectRatio: false,
            responsive: false
        }
    });
  }

  get btnCaptureBoxList() {
    let pairList = [];
    let buttons = document.querySelectorAll("#timeline button");
    let divs = document.querySelectorAll("#timeline .captured-box");

    for (let i = 0; i < buttons.length ; ++i) {
      pairList.push({btn: buttons[i], captured: divs[i]});
    }
    return pairList;
  }

  get captureImages() {
    let imageBoxes =
      this.timelineWrapper.getElementsByClassName("captured-box");
    let captured = [];

    for (let i = 0; i < imageBoxes.length; ++i) {
      let childNodes = imageBoxes[i].childNodes;
      for (let j = 0; j < childNodes.length; ++j) {
        if (childNodes[j] instanceof HTMLImageElement) {
          captured.push(childNodes[j]);
        }
      }
    }

    return captured;
  }

  getSiblings(img) {
    const childNodes = img.parentNode.childNodes;
    let siblings = [];

    for (let i = 0; i < childNodes.length; ++i) {
      if (childNodes[i] instanceof HTMLImageElement) {
        siblings.push(childNodes[i]);
      }
    }
    return siblings;
  }

  updateModal(src, caption) {
    this.modalImage.setAttribute("src", src);
    this.modalCaption.innerHTML = caption;
  }

  openModal() {
    this.modal.classList.add("open-modal");
  }

  closeModal() {
    this.modal.classList.remove("open-modal");
  }

  setModalBtn(backEnable, nextEnable) {
    if (backEnable) {
      this.modalBackBtn.classList.remove("disabled");
    }
    else {
      this.modalBackBtn.classList.add("disabled");
    }

    if (nextEnable) {
      this.modalNextBtn.classList.remove("disabled");
    }
    else {
      this.modalNextBtn.classList.add("disabled");
    }
  }

  get imageTab() {
    let image = document.getElementById("image-tab");
    if (image != undefined) {
      image.associateContent = document.getElementById("timeline");
    }
    return image;
  }

  get chartTab() {
    let chart = document.getElementById("chart-tab");
    if (chart != undefined) {
      chart.associateContent
        = document.getElementById("chart-wrapper");
    }
    return chart;
  }

  tabIsActive(tab) {
    return tab.classList.contains("active-tab");
  }

  activateTab(tabGroup, tab) {
    if (!this.tabIsActive(tab)) {
      let activeTab =
        document.querySelector("#"+ tabGroup + " .active-tab");
      let activeContent = activeTab.associateContent;

      activeTab.classList.remove("active-tab");
      activeContent.classList.remove("active-tab-content");
      tab.classList.add("active-tab");
      tab.associateContent.classList.add("active-tab-content");
    }
  }

  toggleCapturedBox(btn, div) {
    let icon = btn.childNodes[1];
    if (div.classList.contains("opened")) {
      div.classList.remove("opened");
      icon.setAttribute("src", "/icon/plus.png");
    }
    else {
      div.classList.add("opened");
      icon.setAttribute("src", "/icon/minus.png");
    }
  }
}
