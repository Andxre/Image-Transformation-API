import { NextFunction } from 'express';
import { Request, Response } from 'express';
import ImageValidator  from './validators/ImageValidator';
import CommandFactory  from './commands/CommandFactory';
import ImageProcessor from './commands/ImageProcessor';

export default async function transform (req: Request, res: Response, next: NextFunction) {
    const imageValidator = new ImageValidator(); 
    const commandFactory = new CommandFactory();
    const imageProcessor = new ImageProcessor();

    let {image, operations} = req.body;

    try {
        imageValidator.validate(image);
    } catch (err) {
        return next(err);
    }

    operations = removeDuplicateResizes(operations);

    for (let i = 0; i < operations.length; i++) {
        let command = commandFactory.getCommand(operations[i]);
        if (command != null) {
            imageProcessor.addCommand(command);
        }
    }
    let buff: Buffer = Buffer.from(image, 'base64');

    imageProcessor.executeCommands(buff)
        .then((data) => {
            res.status(200).send({
                data: data.toString('base64')
            })
        })
        .catch((err) => {
            return next(err);
        })
}

function removeDuplicateResizes(operations: any[]) {
    const cleanedOps = []
    let resizeFlag: boolean = false;
    for (let i = 0; i < operations.length; i++) {
        if ((operations[i].operation === "thumbnail" || 
            operations[i].operation === "resize")) {
            if (!resizeFlag) {
                cleanedOps.push(operations[i]);
                resizeFlag = true;
            }
        }
        else {
            cleanedOps.push(operations[i]);
        }
    }
    return cleanedOps;
} 