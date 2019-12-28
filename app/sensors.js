import { Accelerometer } from "accelerometer";
import { Gyroscope } from "gyroscope";
import { HeartRateSensor } from "heart-rate";
import { OrientationSensor } from "orientation";

function log_data(type, timestamp, data) {
  console.log(type);
  console.log(timestamp);
  console.log(data);
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
      for (let index = 0; index < accel.readings.timestamp.length; index++) {
        const data = [accel.readings.x[index], accel.readings.y[index], accel.readings.z[index]];

        log_data("accelerometer", timestamp=accel.readings.timestamp[index], data)      
      }
    });
    this.sensors.push(accel);
    accel.start();
  }
}

CustomSensorAPI.prototype.setupGyroscope = function() {
  if (Gyroscope) {
    const gyro = new Gyroscope({ frequency: 10, batch: 100 });
    gyro.addEventListener("reading", () => {
      for (let index = 0; index < gyro.readings.timestamp.length; index++) {
        const data = [gyro.readings.x[index], gyro.readings.y[index], gyro.readings.z[index]];

        log_data("gyroscope", timestamp=gyro.readings.timestamp[index], data)      
      }
    });
    this.sensors.push(gyro);
    gyro.start();
  }
}

CustomSensorAPI.prototype.setupHeartRateSensor = function() {
  if (HeartRateSensor) {
    const hrm = new HeartRateSensor({ frequency: 2, batch: 10 });
    hrm.addEventListener("reading", () => {
      for (let index = 0; index < hrm.readings.timestamp.length; index++) {
        log_data("heart rate", hrm.readings.timestamp[index], [hrm.readings.heartRate[index]])      
      }
    });
    this.sensors.push(hrm);
    hrm.start();
  }
}


CustomSensorAPI.prototype.setupOrientation = function() {
  if (OrientationSensor) {
    const orientation = new OrientationSensor({ frequency: 60 });
    orientation.addEventListener("reading", () => {
      for (let index = 0; index < orientation.readings.timestamp.length; index++) {
        const data = [orientation.readings.x[index], orientation.readings.y[index], orientation.readings.z[index], orientation.readings.scalar[index]];

        log_data("oreintation", timestamp=orientation.readings.timestamp[index], data)      
      }
    });
    this.sensors.push(orientation);
    orientation.start();
  }
}
