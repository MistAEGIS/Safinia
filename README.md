# Safinia
[Safinia](https://glosbe.com/el/en/%CF%83%CE%B1%CF%86%CE%AE%CE%BD%CE%B5%CE%B9%CE%B1) provides you with a skeleton and some middleware to easily create and maintain realtime node.js webapplications.
It utilizes express.js and socket.io. The project comes with a router configuration for socket.io and express.js.

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
