import { genAscii } from "./src/asciiizer";
import { capture } from "./src/picture";

await capture();
console.log(await genAscii());
