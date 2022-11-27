const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

// importing mongoose
const mongoose = require("mongoose");

const options = {
  keepAlive: true,
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Database username and password for database access in our mongoose
const dbUname = "project";
const dbPwd = "project";
const dbUrl = `mongodb+srv://${dbUname}:${dbPwd}@cluster0.qatbpfc.mongodb.net/?retryWrites=true&w=majority`;

// connecting to our database
mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

// validating our mongoose connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Mongo DB has been connected succssfully");
});

// creating a schema for for database
let Schema = mongoose.Schema;
let userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  password: {
    type: String,
  },
});

let UserModel = mongoose.model("user", userSchema);

app.post("/register", async (req, res) => {
  const inputUserInfo = req.body;

  let users = await UserModel.find();
  console.log(users);
  const userWithSameEmail = users.filter(
    (user) => user.email === inputUserInfo.email
  ).length;
  if (userWithSameEmail) {
    return res.status(403).json({
      error: `User with email: ${inputUserInfo.email} already exits.`,
    });
  } else {
    try {
      let user = new UserModel(inputUserInfo);
      console.log(user);
      user = user.save();
      return res.status(200).json({
        status: 200,
        data: user,
      });
    } catch {
      return res.status(400).json({
        status: 400,
      });
    }
  }
});

// User signin
app.post("/signin", async (req, res) => {
  const userToFind = req.body;
  const users = await UserModel.find();

  const userExist = users.filter(
    (user) =>
      user.email === userToFind.email && user.password === userToFind.password
  ).length;

  console.log(userExist);

  if (userExist) {
    console.log("Yes");
    return res.status(200).json({ message: "sign-in" });
  } else {
    return res.status(400).json({ message: "Credential doesn't match!" });
  }
});

app.listen(PORT);
