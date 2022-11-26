const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require("mongoose");

const options = {
    keepAlive: true,
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbUrl = "mongodb+srv://project:project@cluster0.qatbpfc.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dbUrl, options, (err) => {
    if (err) console.log(err);
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Mongo DB has been connected succssfully");
})