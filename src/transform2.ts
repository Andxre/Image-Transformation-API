import { Request, Response } from "express"
import sharp from "sharp";
import ConversionHandler from "./handlers/ConversionHandler";
import Handler from "./handlers/handler";
import ImageHandlerFactory from "./handlers/ImageHandlerFactory";
import ResizeHandler from "./handlers/ResizeHandler";
import { Operation } from "./operations/Operation";
import OperationFactory from "./operations/OperationFactory";

const operationFactory = new OperationFactory();
const imageHandlerFactory = new ImageHandlerFactory();

export default async function transform (req: Request, res: Response) {
    // Use middleware to validate request
    const image = req.body.image;
    const operations: string[] = req.body.operations;

    if (operations.length == 0) {
        res.json("Operations field cannot be empty");
    }

    console.time('first buffer trans2')
    const buff: Buffer = Buffer.from(image, 'base64');


    let obj: sharp.Sharp = sharp(buff);
    console.timeEnd('first buffer trans2')
    const operationList: Operation[] = [];

    operations.forEach((operation: string) => {
        operationList.push(operationFactory.getOperation(operation));
    })

    console.time('execute and send TRANS2')
    let result: Buffer;
    for (let i = 0; i < operationList.length; i++) {
        result = await imageHandlerFactory.getHandler(operationList[i]).handle(obj);
        obj = sharp(result);
    }

    res.status(200).send( { data: result.toString('base64')})
    console.timeEnd('execute and send TRANS2')
}
