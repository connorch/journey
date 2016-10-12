var express = require('express');
var app = express();
var passport = require('passport');
var https = require('https');
var http = require('http');
var fs = require('fs');

var { sequelize } = require('./db/config');
var port = 5000;

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Database connection has been established successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

/* IF YOU ARE WORKING WITH THIS CODE BASE FOR THE FIRST TIME, TO SET UP DATA BASE
MAKE SURE YOU ADD 'JOURNEY' TO MY SQL DATABASE! THEN UNCOMMENT BELOW CODE TO FORCE
DATABASE UPDATE! RECOMMENT AFTER YOU USE 'GULP' ONCE. THEN RESTART YOUR SERVER 
AFTER RECOMMENTING BELOW CODE. */
// sequelize
//   .sync({ force: true })
//   .then(function(err) {
//     console.log('It worked!');
//   }, function (err) { 
//     console.log('An error occurred while creating the table:', err);
//   });

require('./config/passport.js')(passport); // Authentication
require('./config/middleware.js')(app, express, passport); // Middleware
require('./config/routes.js')(app); // Routes


// var privateKey = fs.readFileSync('./https/www_yourjourney_io.key');
// var certificate = fs.readFileSync('./https/www_yourjourney_io.crt');
// var pemBundle = fs.readFileSync('./https/www_yourjourney_io_bundle.pem');

// serverOptions = {
//   ca: pemBundle,
//   key: privateKey,
//   cert: certificate
// }

// sequelize.sync().then(function() {
//   console.log('Synced with mySQL through Sequelize.');

//   https.createServer(serverOptions, app).listen(3000);
//   http.createServer(app).listen(1337);

//   console.log('Listening on Port: 3000');
// });
// Start server

app.listen(port, () => {
  console.log('Listening on Port: ' + port);
  sequelize.sync().then(function() {
    console.log('Synced with mySQL through Sequelize.');
  });
});

module.exports = app;
