import { inbox } from "file-transfer";

import { processAllFiles } from "./fitbitsync.js";

inbox.addEventListener("newfile", processAllFiles);

processAllFiles();

import { inbox } from "file-transfer";

// const appDataDpath = "/private/data/";

// // Process the inbox queue for files, and read their contents as text
// function processAllFiles() {
//   let fileName;
//   while (fileName = inbox.nextFile()) {
//     console.log(`/private/data/${fileName} is now available`);
//   }
// }

// processAllFiles();
