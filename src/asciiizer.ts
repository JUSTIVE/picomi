import { AR, R, pipe } from "@mobily/ts-belt";
import Jimp from "jimp";
import fs from "fs";
import { IMAGE_NAME } from "./picture";

// ASCII 문자 설정
const ASCII_CHARS = "@%#*+=-:. ";
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const imageToAscii = async (path: string): Promise<string> => {
  try {
    const image = await Jimp.read(path);
    const buffer = await image
      .resize(80, (80 * image.bitmap.height) / image.bitmap.width) // 크기 조정
      .greyscale() // 그레이스케일로 변환
      .contrast(0.5) // 대비 향상
      .getBufferAsync(Jimp.MIME_JPEG);
    let asciiImage = "";

    for (let y = 0; y < image.bitmap.height; y++) {
      for (let x = 0; x < image.bitmap.width; x++) {
        const idx = image.getPixelIndex(x, y);
        const grayValue = image.bitmap.data[idx];
        const char =
          ASCII_CHARS[
            clamp(
              Math.floor((grayValue / 255) * (ASCII_CHARS.length - 1)),
              0,
              ASCII_CHARS.length - 1
            )
          ] ?? ASCII_CHARS[ASCII_CHARS.length - 1];
        asciiImage += char;
      }
      asciiImage += "\n";
    }

    return asciiImage;
  } catch (err) {
    return "";
  }
};

const ASCII_FILE = "./.picomi/picomi.txt";
const writeAsciiToFile = async (ascii: string) => {
  await fs.writeFileSync(ASCII_FILE, ascii);
};

export const genAscii = async () => {
  pipe(await imageToAscii(`${IMAGE_NAME}.jpg`), writeAsciiToFile);
};
