var path = require('path');
var express = require('express');

module.exports = {
    web: {
        router: function (routesConfig, controllerFolder, app) {
            return function (req, res, next) {
                var router = new express.Router();

                routesConfig.forEach(function (route) {
                    var controller = require(path.join(controllerFolder, route.controller));

                    router[route.method](route.resource, function (req, res) {
                        controller[route.action](req, res);
                    });
                });

                app.use(router);

                next();
            }
        }
    },

    socket: {
        router: function (routesConfig, controllerFolder, io, sessionMiddleware) {
            return function (socket, next) {
                sessionMiddleware(socket.request, socket.request.res, function () {
                    routesConfig.forEach(function (route) {
                        var controller = require(path.join(controllerFolder, route.controller));

                        if (route.fire) controller[route.action](socket, io, null);

                        socket.on(route.topic, function (data, callback) {
                            controller[route.action](socket, io, data, callback);
                        });
                    });

                    next();
                });
            }
        }
    }
};
