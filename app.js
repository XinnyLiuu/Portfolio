'use strict';
// Modules
const dotenv = require('dotenv').config();
const express = require('express');
const validator = require('express-validator');
const session = require('express-session');
const flash = require('express-flash');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');

// Routes
const staticController = require('./controller/static');

// Production Mode
const prodMode = process.env.NODE_ENV == "production";
// Express Server
const app = express();

// View Engine
const hbs = exphbs.create({
  defaultLayout: 'layouts.hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// HTTP to HTTPS Redirect
app.use(function(req, res, next) {
  if(prodMode && !req.secure) {
    res.redirect('https://www.xinnliu.com' + req.url);
  } else next();
});

// Routes for CSS, JS etc.
app.use(express.static(path.join(__dirname, 'public'), { redirect: false }));

// Express Config
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(validator());
app.use(flash());

// Static Pages
app.get('/', staticController.getHome);
app.post('/', staticController.postHome);

// Local Machine Testing and HTTP
http.createServer(app).listen(process.env.PORT || 8000);
console.log('Server listening on 8000');
