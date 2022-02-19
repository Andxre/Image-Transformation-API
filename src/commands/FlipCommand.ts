import sharp from "sharp";
import Command from "./command";

export default class FlipCommand implements Command {
    private orientation: string;

    constructor(orientation: string) {
        this.orientation = orientation;
    }

    execute(buffer: Buffer): Promise<Buffer> {
        const obj = sharp(buffer);
        if (this.orientation === "vertical") {
            return obj.flip(true).toBuffer();
        }

        return obj.flop(true).toBuffer();
    }

}