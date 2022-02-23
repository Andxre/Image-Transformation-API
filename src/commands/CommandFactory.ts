import Command from "./command";
import GrayscaleCommand from './GrayscaleCommand';
import ThumbnailCommand from './ThumbnailCommand'
import FlipCommand from './FlipCommand';
import RotateCommand from './RotateCommand';
import ResizeCommand from "./ResizeCommand";

export default class CommandFactory {

    constructor() {

    }

    public getCommand(object: any): Command | null {

        if (object.operation === "thumbnail") {
            return new ThumbnailCommand();
        }

        if (object.operation === "resize") {
            const w  = object.parameters.width;
            const h = object.parameters.height;
            return new ResizeCommand(w, h);
        }

        if (object.operation === "grayscale") {
            return new GrayscaleCommand();
        }

        if (object.operation === "flip") {
            return new FlipCommand(object.parameters.orientation);
        }

        if (object.operation === "rotate") {
            return new RotateCommand(object.parameters.angle);
        }

        return null;
    }
}