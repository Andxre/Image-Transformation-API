import sharp from "sharp"
import Handler from "./handler"

export default abstract class ImageHandler implements Handler {
    protected next: Handler | null;

    constructor() {
        this.next = null;
    }

    setNext(h: Handler | null): void {
        this.next = h;
    }

    abstract handle(obj: sharp.Sharp): Promise<Buffer>;
}