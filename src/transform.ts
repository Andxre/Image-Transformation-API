import express, { Request, Response } from "express"
import sharp from "sharp";
import ConversionHandler from "./handlers/ConversionHandler";
import Handler from "./handlers/handler";
import ImageHandlerFactory from "./handlers/ImageHandlerFactory";
import { Operation } from "./operations/Operation";
import OperationFactory from "./operations/OperationFactory";

const operationFactory = new OperationFactory();
const imageHandlerFactory = new ImageHandlerFactory();

export default function transform (req: Request, res: Response) {
    const image = req.body.image;
    const operations: string[] = req.body.operations;

    if (operations.length == 0) {
        res.json("Operations field cannot be empty");
    }

    const buff: Buffer = Buffer.from(image, 'base64');
    const obj: sharp.Sharp = sharp(buff);
    const operationList: Operation[] = [];

    operations.forEach((operation: string) => {
        operationList.push(operationFactory.getOperation(operation));
    })

    let startingHandler: Handler = new ConversionHandler();
    let prev: Handler = startingHandler;

    while (operationList.length > 0) {
        let operation: Operation = operationList.shift();
    
        let h = imageHandlerFactory.getHandler(operation);
    
        prev.setNext(h);
    
        prev = h;
    }
    
    let buffer = startingHandler.handle(obj)
    buffer.then(data => {
        res.json(data.toString('base64'));
    })
    


}
