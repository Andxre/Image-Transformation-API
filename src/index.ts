import express, { NextFunction, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express'
import transform from "./transform";
import ajv from "ajv";
import fs from 'fs';
const swaggerDoc = require('../swagger.json');

const app = express();
const port = 8080; 

// JSON Schema Validator
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

app.use(express.json({limit: '7mb'})); // 2 mb excess for operation data
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.post("/transform", validateBody, transform)

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({ error: err.message });
});

app.listen( port, () => {
    console.log( `the server started at http://localhost:${ port }` );
} );