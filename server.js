require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static("public"));
const bodyParserUrlEncoded = bodyParser.urlencoded({ extended: false });
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                        Setup DB                           *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}
const { assert } = require("chai");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { Schema } = mongoose;
const exerciseUserSchema = new Schema({
  username: { type: String, required: true },
});
let ExerciseUser = mongoose.model("ExerciseUser", exerciseUserSchema);
// TODO exercise model

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     API routes                            *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app
  .route("/api/users")
  /**
   * GET /api/users
   * 
   * Returns a list of all users
   */
  .get((req, res) => {
    ExerciseUser.find({}, (err, docs) => {
      if (err) {
        console.error(err);
        res.json({ error: err });
      } else {
        res.json(docs);
      }
    })
  })
  /**
   * POST /api/users
   *
   * Creates a new user
   * Request body (URL encoded):
   * - username (String)
   */
  .post(bodyParserUrlEncoded, (req, res) => {
    const { username } = req.body;

    // look up if a user with this name already exists ... if so res error
    let promise = ExerciseUser.findOne({ username: username }).exec();
    assert.ok(promise instanceof Promise);
    promise.then((userObject) => {
      if (userObject !== null) {
        // The user exists, so return the object
        res.json({
          username: userObject.username,
          _id: userObject._id,
        });
      } else {
        // The user does not yet exist, so create a new one
        const newUser = new ExerciseUser({ username: username });
        newUser.save((err) => {
          if (err) res.json({ Error: err });
          else
            res.json({
              username: newUser.username,
              _id: newUser._id,
            });
        });
      }
    });
  });

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
