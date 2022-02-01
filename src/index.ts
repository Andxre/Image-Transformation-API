import express, { NextFunction, Request, Response } from "express";
import transform from "./transform";
const app = express();
const port = 8080; 

app.use(express.json({limit: '50mb'})); 

app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.post("/transform", transform)

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({ error: err.message });
});

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );