import express, { NextFunction, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express'
import transformOld from "./transformOld";
import transform from "./transform";
import ajv from "ajv";
import fs from 'fs';
const swaggerDoc = require('../swagger.json');
import { body } from 'express-validator';


const app = express();
const port = 8080; 

const schema = JSON.parse(fs.readFileSync('./schema.json').toString())
const Ajv = ajv();
const validate = Ajv.compile(schema);

function validateBody(req: Request, res: Response, next: NextFunction) {
    const valid = validate(req.body);
    if (!valid) {
        const errors = validate.errors;
        res.status(400).json(errors);
        return;
    }
    next();
}


app.use(express.json({limit: '8mb'})); 
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

/*
Make sure Resize or Thumbnail commands get executed last!
 This increases performance by a lot!
*/
app.post("/transform", validateBody, transform)

app.post(
    "/transformold",
    body('image')
        .exists()
        .withMessage('missing image field')
        .isBase64()
        .withMessage('image must be base64 encoded'),
    body('operations')
        .exists()
        .withMessage('missing operations field')
        .isArray({ min: 1, max: 6})
        .withMessage('Operations should be at least 1 and at most 6'),
    transformOld)


// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({ error: err.message });
});

app.listen( port, () => {
    console.log( `the server started at http://localhost:${ port }` );
} );