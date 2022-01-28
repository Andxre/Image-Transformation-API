import Handler from "./handler"
import { FlipOperation, Operation, ResizeOperation, RotateOperation } from "../operations/Operation";
import { OperationType } from "../operations/OperationType"
import FlipHandler from "./FlipHandler";
import GrayscaleHandler from "./GrayscaleHandler";
import ResizeHandler from "./ResizeHandler";
import RotationHandler from "./RotationHandler";

export default class ImageHandlerFactory {

    getHandler(operation: Operation): Handler | null {
        if (operation.type == OperationType.GRAYSCALE) {
            return new GrayscaleHandler();
        }

        if (operation.type == OperationType.FLIP) {
            const obj = (operation as FlipOperation)
            return new FlipHandler(obj.vertical);
        }

        if (operation.type == OperationType.RESIZE) {
            const obj = (operation as ResizeOperation);
            return new ResizeHandler(obj.width, obj.height);
        }

        if (operation.type == OperationType.ROTATE) {
            const obj = (operation as RotateOperation);
            return new RotationHandler(obj.angle);
        }
        return null;
    }
}