import sharp from "sharp";
import Command from "./command";

export default class GrayscaleCommand implements Command {

    constructor() {

    }

    execute(buffer: Buffer): Promise<Buffer> {
        return sharp(buffer).grayscale().toBuffer();
    }


}