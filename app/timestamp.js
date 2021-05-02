"use strict";

class DateTime {
  constructor(date, time) {
    this.date = date;
    this.time = time;
  }
}

let currentdate = new Date();
let date =
  currentdate.getDate() +
  "/" +
  (currentdate.getMonth() + 1) +
  "/" +
  currentdate.getFullYear();
let time = currentdate.getHours() + ":" + currentdate.getMinutes();

export let dt = new DateTime(date, time);
