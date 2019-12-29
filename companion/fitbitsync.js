import { inbox } from "file-transfer";

const appDataDpath = "/private/data/";

// Process the inbox queue for files, and read their contents as cbor
export async function processAllFiles() {
  let file;
  while ((file = await inbox.pop())) {
    const reading = await file.cbor();
    console.log(`file tag: ${reading.type}`);
    console.log(`file data: ${reading.data}`);
  }
}
