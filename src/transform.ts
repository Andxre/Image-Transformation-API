import { NextFunction } from 'express';
import { Request, Response } from 'express';
import  ImageValidator  from './validators/ImageValidator';
import  CommandFactory  from './commands/CommandFactory';

export default async function transform (req: Request, res: Response, next: NextFunction) {

    const imageValidator = new ImageValidator();
    const commandFactory = new CommandFactory();

    const {image, operations} = req.body;

    try {
        imageValidator.validate(image);
    } catch (err) {
        return next(err);
    }

    let buff: Buffer = Buffer.from(image, 'base64');

    for (let i = 0; i < operations.length; i++) {
        buff = await commandFactory.getCommand(operations[i]).execute(buff);
    }


    res.status(200).send({
        data: buff.toString('base64')
    }) 

}