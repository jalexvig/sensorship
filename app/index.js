import document from "document";

import { Accelerometer } from "accelerometer";
import { Gyroscope } from "gyroscope";
import { HeartRateSensor } from "heart-rate";
import { OrientationSensor } from "orientation";

import * as fs from "fs";

const sensors = [];

function log_data(type, timestamp, data) {
  console.log(type);
  console.log(timestamp);
  console.log(data);
}

function rec_date(sensor_name) {
  let thisDate = new Date();

  let recFilename = sensor_name+`_${thisDate.getFullYear()}${("0" + (thisDate.getMonth() + 1)).slice(-2)}${("0" + (thisDate.getDate() + 1)).slice(-2)}${("0" + (thisDate.getHours() +1)).slice(-2)}${("0" + (thisDate.getMinutes() +1)).slice(-2)}.txt`;
  console.log(recFilename)
  return recFilename
//  console.log("File name   ",recFilename);
}
rec_date("accel")

if (Accelerometer) {
  const accel = new Accelerometer({ frequency: 10, batch: 100 });
  accel.addEventListener("reading", () => {
    for (let index = 0; index < accel.readings.timestamp.length; index++) {
      const data = [accel.readings.x[index], accel.readings.y[index], accel.readings.z[index]];
      
      log_data("accelerometer", timestamp=accel.readings.timestamp[index], data)      
    }
  });
  sensors.push(accel);
  accel.start();
}

if (Gyroscope) {
  const gyro = new Gyroscope({ frequency: 10, batch: 100 });
  gyro.addEventListener("reading", () => {
    for (let index = 0; index < gyro.readings.timestamp.length; index++) {
      const data = [gyro.readings.x[index], gyro.readings.y[index], gyro.readings.z[index]];
      
      log_data("gyroscope", timestamp=gyro.readings.timestamp[index], data)      
    }
  });
  sensors.push(gyro);
  gyro.start();
}

if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 2, batch: 10 });
  hrm.addEventListener("reading", () => {
    for (let index = 0; index < hrm.readings.timestamp.length; index++) {
      log_data("heart rate", hrm.readings.timestamp[index], [hrm.readings.heartRate[index]])      
    }
  });
  sensors.push(hrm);
  hrm.start();
}

if (OrientationSensor) {
  const orientation = new OrientationSensor({ frequency: 60 });
  orientation.addEventListener("reading", () => {
    for (let index = 0; index < orientation.readings.timestamp.length; index++) {
      const data = [orientation.readings.x[index], orientation.readings.y[index], orientation.readings.z[index], orientation.readings.scalar[index]];
      
      log_data("oreintation", timestamp=orientation.readings.timestamp[index], data)      
    }
  });
  sensors.push(orientation);
  orientation.start();
}

const togglebutton = document.getElementById("toggle-button");

let started = true;

togglebutton.onactivate = function(evt) {
  let sensor;
  if (started) {
    togglebutton.text = "Start";
    for (sensor of sensors) { 

      sensor.stop(); }
    started = false;
  } else {
    togglebutton.text = "Stop!";
    for (sensor of sensors) {
      sensor.start();
    }
    started = true;
  }
}
