# Safinia
[Safinia](https://glosbe.com/el/en/%CF%83%CE%B1%CF%86%CE%AE%CE%BD%CE%B5%CE%B9%CE%B1) provides you with middleware and skeleton to easily create and maintain realtime node.js webapplications.
It utilizes express.js and socket.io. The project comes with router middleware for socket.io and express.js.

## Installation

    npm install safinia --save

## Middleware
You can use the Safinia middleware to create routers that listen to http requests and websocket emits.

```javascript
// dependencies
var express = require('express');
var session = require('express-session')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Safinia = require('Safinia');

// direct incoming http requests to a web router config file
var webRoutes = require('./config/routes.web');
app.use(Safinia.web.router(webRoutes, __dirname + '/controllers/web/', app));

// direct incoming websocket emits to a socket router config file
var sessionMiddleware = session({ 'secret' : 'your-secret' });
var socketRoutes = require('./config/routes.sockets');
io.use(Safinia.socket.router(socketRoutes, __dirname + '/controllers/sockets/', io, sessionMiddleware));
```

For more information on how the router config files should be structured see this [link](https://github.com/MistAEGIS/Safinia/tree/master/skeleton/config).

## Skeleton
You can use the skeleton provided [here](https://github.com/MistAEGIS/Safinia/tree/master/skeleton) to kickstart your node.js application. The skeleton makes use of socket.io, express.js and mongoose. Make sure you have mongodb running at `mongodb://localhost:27017` or use a different database by changing this [line](https://github.com/MistAEGIS/Safinia/blob/master/skeleton/config/settings.js#L4).
