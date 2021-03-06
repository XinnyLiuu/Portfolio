"use strict";

// Modules
const dotenv = require("dotenv").config();
const express = require("express");
const validator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const morgan = require("morgan");

const prodMode = process.env.NODE_ENV === "production";

// Routes
const staticController = require("./controller/static");

// Express Server
const app = express();

// Logger
app.use(morgan("dev"));

// Force Https [for heroku]
app.get("*", function (req, res, next) {
  if (req.headers["x-forwarded-proto"] != "https" && prodMode) {
    res.redirect("https://www.xinnliu.com" + req.url);
  } else {
    next();
  }
});

// View Engine
const hbs = exphbs.create({
  defaultLayout: "layouts.hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// Routes for CSS, JS etc.
app.use(express.static(path.join(__dirname, "./public"), { redirect: false }));

// Express Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    // secret: process.env.SESSION_SECRET,
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(validator());
app.use(flash());

// Static Pages
app.get("/", staticController.getHome);
app.post("/", staticController.postHome);
app.get("/resume", staticController.getResume);

// Local Machine Testing and HTTP
http.createServer(app).listen(process.env.PORT || 8000);
console.log("Server listening on 8000");
