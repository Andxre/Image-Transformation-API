import express, { NextFunction, Request, Response } from "express";
import transform from "./transform";
import ajv from "ajv";
import fs from 'fs';
import ValidationError from "./validators/ValidationError";

const app = express();
const port = 8080; 

// JSON Schema Validator
const schema = JSON.parse(fs.readFileSync('./schema.json').toString())
const Ajv = ajv();
const validate = Ajv.compile(schema);

function validateBody(req: Request, res: Response, next: NextFunction) {
    const valid = validate(req.body);
    if (!valid) {
        const errors = validate.errors[0];
        res.status(400).send({
            errorCode: 1000,
            error: {
                path: errors.dataPath,
                message: errors.message,
                params: errors.params,
            }
        })
        return;
    }
    next();
}

app.use(express.json({limit: '7mb'})); // 2 mb excess for operation data
app.post("/transform", validateBody, transform)

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError) {
        return res.status(400).send({errorCode: 1000, error: err.message});
    }

    if (err instanceof ValidationError) {
        return res.status(400).send({ errorCode: err.code, error: err.message});
    }

    return res.status(500).send({ errorCode: 2000, error: err.message });
});

app.listen( port, () => {
    console.log( `the server started at http://localhost:${ port }` );
} );