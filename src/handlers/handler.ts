import sharp from "sharp"

export default interface Handler {
    setNext(h: Handler | null): void;

    handle(obj: sharp.Sharp): Promise<Buffer>;
}