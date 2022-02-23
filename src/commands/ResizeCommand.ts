import sharp from "sharp";
import Command from "./command";

export default class ResizeCommand implements Command {
    protected width: number;
    protected height: number;

    constructor(w: number, h: number) {
        if (w >= 5000 || h >= 5000) {
            throw new Error("Resize width and height must be below 5000px");
        }

        this.width = w;
        this.height = h;
    }

    execute(buffer: Buffer): Promise<Buffer> {
        return sharp(buffer).resize({width: this.width, height: this.height}).toBuffer();
    }
}