import sharp from "sharp"
import ImageHandler from "./ImageHandler";

export default class ResizeHandler extends ImageHandler {
    private width: number;
    private height: number;

    constructor(w: number, h: number) {
        super();
        this.width = w;
        this.height = h;
    }

    private resize(obj: sharp.Sharp): Promise<Buffer> { 
        return obj.resize({ width: this.width, height: this.height }).toBuffer();
    }

    async handle(obj: sharp.Sharp): Promise<Buffer> {
        let buffer = await this.resize(obj);
        if (this.next) {
            return this.next.handle(sharp(buffer));
        } else {
            return buffer;
        }
    }
}
