import InputValidator from "../validators/InputValidator";
import { ResizeOperation, GrayscaleOperation, FlipOperation, RotateOperation, Operation } from "./Operation";

export default class OperationFactory {

    private validator: InputValidator;

    constructor() {
        this.validator = new InputValidator();
    }

    getOperation(input: string): Operation | null {
        if (!this.validator.validate(input)) {
            throw new Error(input + ' is not valid.')
        }

        if (input.startsWith('thumbnail')) {
            return new ResizeOperation(100, 100);
        }

        if (input.startsWith('grayscale')) {
            return new GrayscaleOperation();
        }

        if (input.startsWith('resize')) {
            const [op, w, h] = input.split(' ');

            // Cast width and height
            const width = Number(w);
            const height = Number(h);

            // Validate width and height within bounds


            return new ResizeOperation(width, height);
        }

        if (input.startsWith('flip')) {
            const [op, orientation] = input.split(' ');

            let vertical: boolean;
            if (orientation == 'vertical') {
                vertical = true;
            } else {
                vertical = false;
            }

            return new FlipOperation(vertical);
        }

        if (input.startsWith('rotate')) {
            const [op, a] = input.split(' ');

            let angle: number;
            if (a == 'left') {
                angle = -90;
            } else if (a == 'right') {
                angle = 90;
            } else {
                angle = Number(a);

                if (angle < -360 || angle > 360) {
                    throw new Error('Invalid Angle (-360 to 360)');
                }
            }
            return new RotateOperation(angle);
        }
        return null;
    }
}