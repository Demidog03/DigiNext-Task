import dotenv from 'dotenv'
import express from 'express';
import mongoose from "mongoose";
import cors from 'cors'
import db from './models/index.js';

dotenv.config()
const app = express()
const port = process.env.PORT || 9000
const connection_url = process.env.DBURL;


//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB config
//Models (Roles)
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

//Enpoints
app.get('/', (req, res) =>  res.json({ message: "Connected to server. Welcome!" }))

// routes
import entityRoutes from "./routes/entity.routes.js";

entityRoutes(app);

//listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))


