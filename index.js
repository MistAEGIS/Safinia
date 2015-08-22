// vendor dependencies
var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');

// local dependencies and variables
var config = require('./config/settings');
var webRouter = new express.Router();
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

// socket middleware
io.use(function (socket, next) { sessionMiddleware(socket.request, socket.request.res, next); });

// web router
webRoutes.forEach(function (route) {
    var controller = require('./controllers/web/' + route.controller);

    webRouter[route.method](route.resource, function (req, res) {
        controller[route.action](req, res);
    });
});

app.use(webRouter);

// socket router
io.on('connection', function (socket) {
    socketRoutes.forEach(function (route) {
        var controller = require('./controllers/sockets/' + route.controller);

        if (route.fire) controller[route.action](socket, io, null);

        socket.on(route.topic, function (data, callback) {
            controller[route.action](socket, io, data, callback);
        });
    });
});

// mongodb connection
mongoose.connect(config.mongodb);

// start server
server.listen(config.port, function () {
    console.log('Server is listening at port ' + config.port);
});
