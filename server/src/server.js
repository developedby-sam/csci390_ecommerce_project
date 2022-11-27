const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// importing mongoose
const mongoose = require("mongoose");

const options = {
    keepAlive: true,
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Database username and password for database access in our mongoose
const dbUname = "project"
const dbPwd = "project"
const dbUrl = `mongodb+srv://${dbUname}:${dbPwd}@cluster0.qatbpfc.mongodb.net/?retryWrites=true&w=majority`

// connecting to our database
mongoose.connect(dbUrl, options, (err) => {
    if (err) console.log(err);
})

// validating our mongoose connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Mongo DB has been connected succssfully");
})

// creating a schema for for database
let Schema = mongoose.Schema;
let userSchema = new Schema(
    {
        name : {
            type: String
        },
        email : {
            type: String
        },
        phoneNumber : {
            type: Number
        },
        password : {
            type: String
        }
    }
);

let UserModel = mongoose.model("user", userSchema);

app.post('/register', async (req, res) => {
    const inputUserInfo = req.body;
    console.log(inputUserInfo);
    
    let users = await UserModel.find();
    const userWithSameEmail = users.filter( user => user.email === inputUserInfo.email).length;
    if (userWithSameEmail) {
        res.status(500).send(`User with email: ${inputUserInfo.email} already exits.`);
    }
    else {
        try {
            console.log('User Info:', inputUserInfo);
            let user = new UserModel(inputUserInfo);
            user = user.save();
            res.status(200).json({
                status:400,
                data:user,
            });

        }
        catch {
            res.status(400).json({
                status:400,
                data:user,
            });
        }
    }
         
});

app.listen(PORT)
