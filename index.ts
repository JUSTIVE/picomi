import { genAscii } from "./src/asciiizer";
import { IMAGE_NAME, capture } from "./src/picture";
import fs from "fs";

await capture();
await genAscii();
fs.unlinkSync(`${IMAGE_NAME}.jpg`);
