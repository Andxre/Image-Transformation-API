import { Request, Response } from "express"
import { validationResult } from "express-validator";
import sharp from "sharp";
import ConversionHandler from "./handlers/ConversionHandler";
import Handler from "./handlers/handler";
import ImageHandlerFactory from "./handlers/ImageHandlerFactory";
import { Operation } from "./operations/Operation";
import OperationFactory from "./operations/OperationFactory";

const operationFactory = new OperationFactory();
const imageHandlerFactory = new ImageHandlerFactory();

export default function transform (req: Request, res: Response) {
    console.time('fullTransform')
    // Use middleware to validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
          { 
            message: "Request body validation error", 
            errors: errors.array() 
        });
    }
    
    const image = req.body.image;
    const operations: string[] = req.body.operations;

    console.time('first buffer trans')
    const buff: Buffer = Buffer.from(image, 'base64');

    const obj: sharp.Sharp = sharp(buff);
    console.timeEnd('first buffer trans')
    const operationList: Operation[] = [];

    console.time('operation')
    operations.forEach((operation: string) => {
        operationList.push(operationFactory.getOperation(operation));
    })
    console.timeEnd('operation')

    // Could make this its own method - createHandler(operationList: Operation[]): ImageHandler
    let startingHandler: Handler = new ConversionHandler();
    let prev: Handler = startingHandler;

    while (operationList.length > 0) {
        let operation: Operation = operationList.shift();
    
        let h = imageHandlerFactory.getHandler(operation);
    
        prev.setNext(h);
    
        prev = h;
    }

    console.time('execute and send TRANS')
    let buffer = startingHandler.handle(obj)
 
    buffer.then(data => {
        console.time('sendTrans')
        res.status(200).send({ data: data.toString('base64') });
        console.timeEnd('sendTrans')
    }).catch(err => {
        res.status(500).send({ error: "Internal Server Error"})
    })
    console.timeEnd('execute and send TRANS')
    console.timeEnd('fullTransform')
}
