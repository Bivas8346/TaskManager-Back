const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");

const app = express();

const router = require("./Router/Apirouter");
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

const dbc =
  "mongodb+srv://rajdasrd8346:gyc4uEoZBZ1jg8d9@cluster0.ujxgdoi.mongodb.net/Task";
const port = process.env.PORT || 4525;

mongoose
  .connect(dbc, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, () => {
      console.log(`server is running port at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
