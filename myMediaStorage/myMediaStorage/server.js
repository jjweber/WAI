// Get dependencies
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
