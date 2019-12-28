import { inbox } from "file-transfer";

const appDataDpath = "/private/data/";

// Process the inbox queue for files, and read their contents as text
export async function processAllFiles() {
  let file;
  while ((file = await inbox.pop())) {
    const data = await file.cbor();
    console.log(`file tag: ${data.tag}`);
  }
}
