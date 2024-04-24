const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const storyRoute = require("./routes/story"); // add this line
const bodyParser = require("body-parser");
const cors = require('cors');

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("DB failed to connect", error));

app.use("/auth", authRoute);
app.use("/story", storyRoute); // add this line

app.use("/", (req, res) => {
  res.json({
    service: "Backend Joblisting server",
    status: "active",
  });
});

const Port = process.env.PORT || 3000;

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
