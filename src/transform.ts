import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import  OperationValidator  from './validators/OperationValidator';
import  ImageValidator  from './validators/ImageValidator';
import  CommandFactory  from './commands/CommandFactory';

export default async function transform (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
          { 
            message: "Request body validation error", 
            errors: errors.array() 
        });
    }

    const imageValidator = new ImageValidator();
    const operationValidator = new OperationValidator();
    const commandFactory = new CommandFactory();

    const {image, operations} = req.body;

    try {
        imageValidator.validate(image);
    } catch (err) {
        return next(err);
    }

    console.time('start')
    let buff: Buffer = Buffer.from(image, 'base64');

    for (let i = 0; i < operations.length; i++) {
        buff = await commandFactory.getCommand(operations[i]).execute(buff);
    }
    console.timeEnd('start')

    res.status(200).send({
        data: buff.toString('base64')
    })

}