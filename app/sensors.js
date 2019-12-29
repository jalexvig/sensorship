import * as fs from "fs";

import { Accelerometer } from "accelerometer";
import { Gyroscope } from "gyroscope";
import { HeartRateSensor } from "heart-rate";
import { OrientationSensor } from "orientation";

function log_data(type, timestamp, data) {
  
  let obj = {
    "type": type,
    "timestamp": timestamp,
    "data": data
  }
  
  fs.writeFileSync(getFilename(type), obj, "cbor")
}

function getFilename(sensor_name) {
  let thisDate = new Date();

  let recFilename = sensor_name+`_${thisDate.getFullYear()}${("0" + (thisDate.getMonth() + 1)).slice(-2)}${("0" + (thisDate.getDate() + 1)).slice(-2)}${("0" + (thisDate.getHours() +1)).slice(-2)}${("0" + (thisDate.getMinutes() +1)).slice(-2)}.cbor`;
  
  console.log(recFilename)
  
  return recFilename
}

export function CustomSensorAPI() {
  this.sensors = [];
  this.setupSensors();
  this.started = true;
};

CustomSensorAPI.prototype.toggleSensors = function() {
  let sensor;
  if (this.started) {
    for (sensor of this.sensors) { sensor.stop(); }
    this.started = false;
  } else {
    for (sensor of this.sensors) { sensor.start(); }
    this.started = true;
  }
  
  return this.started;
}

CustomSensorAPI.prototype.setupSensors = function() {
  this.setupAccelerometer();
  this.setupGyroscope();
  this.setupHeartRateSensor();
  this.setupOrientation();
}


CustomSensorAPI.prototype.setupAccelerometer = function() {
  
  let self = this;
  
  if (Accelerometer) {
    const accel = new Accelerometer({ frequency: 10, batch: 100 });
    accel.addEventListener("reading", () => {
      const data = [accel.readings.x, accel.readings.y, accel.readings.z];
      log_data("accelerometer", timestamp=accel.readings.timestamp, data)      
    });
    this.sensors.push(accel);
    accel.start();
  } else {
    console.log("Accelerometer not found.");
  }
}

CustomSensorAPI.prototype.setupGyroscope = function() {
  if (Gyroscope) {
    const gyro = new Gyroscope({ frequency: 10, batch: 100 });
    gyro.addEventListener("reading", () => {
      const data = [gyro.readings.x, gyro.readings.y, gyro.readings.z];
      log_data("gyroscope", timestamp=gyro.readings.timestamp, data)      
    });
    this.sensors.push(gyro);
    gyro.start();
  } else {
    console.log("Gyroscope not found.");
  }
}

CustomSensorAPI.prototype.setupHeartRateSensor = function() {
  if (HeartRateSensor) {
    const hrm = new HeartRateSensor({ frequency: 2, batch: 10 });
    hrm.addEventListener("reading", () => {
      log_data("heartrate", hrm.readings.timestamp, [hrm.readings.heartRate])      
    });
    this.sensors.push(hrm);
    hrm.start();
  } else {
    console.log("Heart Rate Monitor not found.");
  }
}


CustomSensorAPI.prototype.setupOrientation = function() {
  if (OrientationSensor) {
    const orientation = new OrientationSensor({ frequency: 60, batch: 100 });
    orientation.addEventListener("reading", () => {
      const data = [orientation.readings.x, orientation.readings.y, orientation.readings.z, orientation.readings.scalar];
      log_data("orientation", timestamps=orientation.readings.timestamp, data)      
    });
    this.sensors.push(orientation);
    orientation.start();
  } else {
    console.log("Orientation not found.");
  }
}
