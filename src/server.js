import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import router from "./api/Server"

import models from "./models"

const app = express();

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( cors() );

const port = process.env.PORT || 3001;

app.use( "/api", router );

models.sequelize.sync().then( () => {
	app.listen( port );
	console.log( "magic happens on port " + port );
} )