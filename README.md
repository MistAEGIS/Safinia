# Safinia [![Build Status](https://travis-ci.org/MistAEGIS/Safinia.svg?branch=master)](https://travis-ci.org/MistAEGIS/Safinia)
**Safinia** _(σαφήνεια)_ provides you with the middleware and a skeleton to easily create and maintain realtime node.js webapplications. It is built for use with socket.io and express.js.

## Installation

    npm install safinia --save

## How to use
In order to use the Safinia middleware, you must include it in your server file.
It is also required that you use a certain [router](https://github.com/MistAEGIS/Safinia#routers) and [controller](https://github.com/MistAEGIS/Safinia#controllers) structure.

**server.js**
```javascript
// dependencies
var express = require('express');
var session = require('express-session')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var safinia = require('safinia');

// direct incoming http requests to a web router config file
var webRoutesConfig = require('./config/routes.web');
var webControllerFolder = __dirname + '/controllers/web/';
app.use(safinia.web.router(webRoutesConfig, webControllerFolder, app));

// direct incoming websocket emits to a socket router config file
var sessionMiddleware = session({ 'secret' : 'your-secret' });
var socketRoutesConfig = require('./config/routes.sockets');
var socketControllerFolder = __dirname + '/controllers/sockets/';
io.use(safinia.socket.router(socketRoutesConfig, socketControllerFolder, io, sessionMiddleware));
```


## Routers
Below you can find the two types of router config files _(web and socket)_.
Note that the config file is parsed from top to bottom. This allows you to add API functionality and error handling for specific URI's and in every other case you load the index file, which can be handy for a [SPA](https://nl.wikipedia.org/wiki/Single_Page_Application), see the example below.

**routes.web.js**
```javascript
// you can use the same syntax that express allows you to use to create resource URI's, regex is supported
module.exports =
[
    { resource: '/api/users',        method: 'get',       controller: 'user',       action: 'list'        },
    { resource: '/api/users',        method: 'post',      controller: 'user',       action: 'add'         },
    { resource: '/api/users/:id',    method: 'get',       controller: 'user',       action: 'get'         },
    { resource: '/api/users/:id',    method: 'put',       controller: 'user',       action: 'update'      },
    { resource: '/api/users/:id',    method: 'delete',    controller: 'user',       action: 'delete'      },
    { resource: '/login',            method: 'post',      controller: 'session',    action: 'authorize'   },
    { resource: '/logout',           method: 'get',       controller: 'session',    action: 'unauthorize' },
    { resource: '/*',                method: 'get',       controller: 'index',      action: 'index'       }
];
```

**socket.web.js**
```javascript
// here you can't use fancy wildcards or regex for the socket topics, every topic is a fixed string
// also note the fire property, it allows automatic execution of an action upon socket connection
module.exports =
[
    { topic: 'connection',           controller: 'connect',    action:    'connected',    fire: true },
    { topic: 'disconnect',           controller: 'connect',    action:    'disconnected'             },
    { topic: 'room.join',            controller: 'room',       action:    'join'                     },
    { topic: 'room.leave',           controller: 'room',       action:    'leave'                    },
    { topic: 'room.clients.list',    controller: 'room',       action:    'listConnectedClients'     },
];
```

## Controllers
Within Safinia you are required to specify a folder where controllers are stored. The router then looks for the specified controller. The two types of controllers _(web and socket)_ makes use of two similiar structures.

**Web controller**
```javascript
module.exports =
{
    actionName: function (req, res) {
        // render a page
    },

    anotherAction: function (req, res) {
        // do api stuff
    }
}
```

**Socket controller**
```javascript
module.exports =
{
    actionName: function (socket, io, data, callback) {
        // broadcast a topic
    },

    anotherAction: function (socket, io, data, callback) {
        // respond with a callback
    }
}
```


## Skeleton
You can use the skeleton provided [here](https://github.com/MistAEGIS/Safinia/tree/master/skeleton) to kickstart your node.js application. The skeleton makes use of socket.io, express.js and mongoose. Make sure you have mongodb running at `mongodb://localhost:27017` or use a different database by changing this [line](https://github.com/MistAEGIS/Safinia/blob/master/skeleton/config/settings.js#L4).
