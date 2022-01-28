import sharp from "sharp"
import ImageHandler from "./ImageHandler";

export default class FlipHandler extends ImageHandler {
    private vertical: boolean;

    constructor(vertical: boolean) {
        super();
        this.vertical = vertical;
    }

    private flipVertical(obj: sharp.Sharp): Promise<Buffer> {
        return obj.flip(true).toBuffer();
    }

    private flipHorizontal(obj: sharp.Sharp): Promise<Buffer> {
        return obj.flop(true).toBuffer();
    }

    async handle(obj: sharp.Sharp): Promise<Buffer> {
        let buffer;
        if (this.vertical) {
            buffer = await this.flipVertical(obj);
        } else {
            buffer = await this.flipHorizontal(obj);
        }

        if (this.next) {
            return this.next.handle(sharp(buffer));
        } else {
            return buffer;
        }
    }
}