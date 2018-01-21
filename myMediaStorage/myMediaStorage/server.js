/* Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const BitbucketStrategy = require('passport-bitbucket').Strategy;


const MongoStore = require('connect-mongo')(session);


const app = express();

const api = require('./server/routes/api');


// Parsers for POST data
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up a mlab account to use for mongodb. Connect to that db.
mongoose.connect('mongodb://root:root@ds263707.mlab.com:63707/saved-media'); // Connect to MongoDB database for polling app.

// Make sure mongod is running! If not, log an error and exit.
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.

const port = process.env.PORT || '3000';
app.set('port', port);
 */
/**
 * Create HTTP server.

const server = http.createServer(app);
 */
/**
 * Listen on provided port, on all network interfaces.

server.listen(port, () => console.log(`API running on localhost:${port}`));
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function() {
  console.log('Server running on localhost:' + port);
})
