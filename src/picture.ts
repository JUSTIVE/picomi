import NodeWebcam from "node-webcam";
import { promisify } from "node:sys";

const _capture = promisify(NodeWebcam.capture);
export const IMAGE_NAME = "picomi";

export const capture = async () => {
  await _capture(IMAGE_NAME, {
    width: 720,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "location",
  });
};
