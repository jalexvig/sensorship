import document from "document";

import { CustomSensorAPI } from "./sensors.js"
import { CustomSyncAPI } from "./mobilesync.js"


// SENSORS
let customSensorAPI = new CustomSensorAPI(togglebutton);

const togglebutton = document.getElementById("toggle-button");
  
togglebutton.onactivate = function(evt) {
  if (customSensorAPI.toggleSensors()) {
    togglebutton.text = "Stop!";
  } else {
    togglebutton.text = "Start";
  }
}

// SYNCING
let customSyncAPI = new CustomSyncAPI();
customSyncAPI.syncFiles();