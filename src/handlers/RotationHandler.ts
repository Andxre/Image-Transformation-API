import sharp from "sharp"
import ImageHandler from "./ImageHandler";

export default class RotationHandler extends ImageHandler {
    private angle: number;

    constructor(angle: number) {
        super();
        this.angle = angle;
    }

    private rotate(obj: sharp.Sharp): Promise<Buffer> {
        return obj.rotate(this.angle).toBuffer();
    }

    async handle(obj: sharp.Sharp): Promise<Buffer> {
        const buffer = await this.rotate(obj);
        if (this.next) {
            return this.next.handle(sharp(buffer));
        } else {
            return buffer;
        }
    }
}