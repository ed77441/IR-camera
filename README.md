# IR-camera
This project is IOT-related. The way it works is that when IR dectect people it will trigger camera and send data back to server.
And user can go to website to see the status.

## Description
* Sensors consists of a raspiberry pi, ir detector and camera module
* Website page is generate by php template
* Only image page is interactable, the others are just dummy pages
* Image page's `javascript` code is written in MVC pattern 
* Image page will constantly update itself as well if your search day is today.
* Click on calendar to select and search for images
* If there is some images on certain day, then it will be marked as red color

## External Library
* [chart.js](https://www.chartjs.org/) for drawing statistics bar chart

## Project architecture

## Demo

### Desktop view

#### Home
![home-d](https://github.com/ed77441/IR-camera/blob/master/display/1.png)

#### Image-display
![image-dd](https://github.com/ed77441/IR-camera/blob/master/display/2.png)

#### Image-barchart
![image-db](https://github.com/ed77441/IR-camera/blob/master/display/3.png)

#### Image-modal
![image-dm](https://github.com/ed77441/IR-camera/blob/master/display/4.png)

#### Service
![service-d](https://github.com/ed77441/IR-camera/blob/master/display/5.png)

#### About
![about-d](https://github.com/ed77441/IR-camera/blob/master/display/6.png)

### Mobile view

#### Home
![home-m](https://github.com/ed77441/IR-camera/blob/master/display/7.png)

#### Image
![image-m](https://github.com/ed77441/IR-camera/blob/master/display/8.png)

#### Service
![service-m](https://github.com/ed77441/IR-camera/blob/master/display/9.png)

#### About
![about-m](https://github.com/ed77441/IR-camera/blob/master/display/10.png)
