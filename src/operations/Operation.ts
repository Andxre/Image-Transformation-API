import { OperationType } from "./OperationType";

export interface Operation {
    type: OperationType;
}

export class ResizeOperation implements Operation {
    type: OperationType;
    width: number;
    height: number;

    constructor(w: number, h: number) {
        this.type = OperationType.RESIZE;
        this.width = w;
        this.height = h;
    }
}

export class RotateOperation implements Operation {
    type: OperationType;
    angle: number;

    constructor(angle: number) {
        this.type = OperationType.ROTATE;
        this.angle = angle;
    }
}

export class FlipOperation implements Operation {
    type: OperationType;
    vertical: boolean;

    constructor(vertical: boolean) {
        this.type = OperationType.FLIP;
        this.vertical = vertical;
    }
}

export class GrayscaleOperation implements Operation {
    type: OperationType;

    constructor() {
        this.type = OperationType.GRAYSCALE;
    }
}

