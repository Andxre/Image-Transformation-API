import express from "express";
import transform from "./transform";
const app = express();
const port = 8080; // default port to listen

app.use(express.json({limit: '50mb'})); // Body Parser

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.post("/transform", transform)



// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );