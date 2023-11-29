import { AR, R, pipe } from "@mobily/ts-belt";
import * as P from "./promise";
import Jimp from "jimp";

// ASCII 문자 설정
const ASCII_CHARS = "@%#*+=-:. ";

export const genAscii = async () => {
  try {
    const image = await Jimp.read("image.jpg");
    const buffer = await image
      .resize(Jimp.AUTO, 50) // 크기 조정
      .greyscale() // 그레이스케일로 변환
      .contrast(1) // 대비 향상
      .getBufferAsync(Jimp.MIME_JPEG);
    let asciiImage = "";
    for (let y = 0; y < image.bitmap.height; y++) {
      for (let x = 0; x < image.bitmap.width; x++) {
        const idx = image.getPixelIndex(x, y);
        const grayValue = buffer[idx];
        const char =
          ASCII_CHARS[Math.floor((grayValue / 255) * (ASCII_CHARS.length - 1))];
        asciiImage += char;
      }
      asciiImage += "\n";
    }

    console.log(asciiImage);
  } catch (err) {
    console.error(err);
  }
};
