import * as fs from "fs";

import { outbox } from "file-transfer";

// temporary emulation of data
let json_data = {
  "tag": "blah",
  "latitude": -2.932463,
  "longitude": 151.797305
};
fs.writeFileSync("data.cbor", json_data, "cbor");


const appDataDpath = "/private/data/";

export function CustomSyncAPI() {};

CustomSyncAPI.prototype.syncFiles = function() {
  const listDir = fs.listDirSync(appDataDpath);
  let dirIter = "";
  while((dirIter = listDir.next()) && !dirIter.done) {
    let fpath = appDataDpath + dirIter.value;
    this.syncFile(fpath);
  }
}

CustomSyncAPI.prototype.syncFile = function(fpath) {
  outbox
  .enqueueFile(fpath)
  .then((ft) => {
    console.log(`Transfer of ${ft.name} successfully queued.`);
    fs.unlinkSync(fpath);
  })
  .catch((error) => {
    console.log(`Failed to schedule transfer: ${error}`);
  })
}