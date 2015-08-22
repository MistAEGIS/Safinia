// vendor dependencies
var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var Safinia = require('../Safinia');

// local dependencies and variables
var config = require('./config/settings');
var webRoutes = require('./config/routes.web');
var socketRoutes = require('./config/routes.sockets');

// common variables
process.env.root = __dirname;
var sessionMiddleware = session({ 'secret' : 'your-secret', 'resave' : false, 'saveUninitialized' : true });

// app middleware
app.use(sessionMiddleware);
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ 'extended' : true }));
app.use(express.static(__dirname + config.publicFolder, config.cache ));
app.use(Safinia.web.router(webRoutes, __dirname + '/controllers/web/', app));

// socket middleware
io.use(Safinia.socket.router(socketRoutes, __dirname + '/controllers/sockets/', io, sessionMiddleware));

// mongodb connection
mongoose.connect(config.mongodb);

// start server
server.listen(config.port, function () {
    console.log('Server is listening at port ' + config.port);
});
