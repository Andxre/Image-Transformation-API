
import sharp from "sharp";
import Handler from "./handler";

export default class ConversionHandler implements Handler {
    protected next: Handler | null;

    constructor() {
        this.next = null;
    }

    setNext(h: Handler | null): void {
        this.next = h;
    }

    async handle(obj: sharp.Sharp): Promise<Buffer> {        
        if (this.next) {
            return this.next.handle(obj);
        } else {
            return obj.toBuffer();
        }
    }
}