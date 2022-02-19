import sharp from "sharp";
import Command from "./command";

export default class RotateCommand implements Command {
    private angle: number;

    constructor(angle: number) {
        if (angle < -360 || angle > 360) {
            throw new Error("Rotate angle must be between -360 to 360 deg");
        }
        this.angle = angle;
    }

    execute(buffer: Buffer): Promise<Buffer> {
        return sharp(buffer).rotate(this.angle).toBuffer();
    }
}
