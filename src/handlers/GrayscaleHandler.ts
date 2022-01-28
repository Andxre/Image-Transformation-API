import sharp from "sharp"
import ImageHandler from "./ImageHandler";

export default class GrayscaleHandler extends ImageHandler {

    constructor() {
        super();
    }

    private grayscale(obj: sharp.Sharp): Promise<Buffer> {
        return obj.grayscale(true).toBuffer();
    }

    async handle(obj: sharp.Sharp): Promise<Buffer> {
        const buffer = await this.grayscale(obj);
        if (this.next) {
            return this.next.handle(sharp(buffer));
        } else {
            return buffer;
        }
    }
}