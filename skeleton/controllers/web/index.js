var pkg = require(process.env.root + '/package.json');
var routes = require(process.env.root + '/config/routes.web');
var config = require(process.env.root + '/config/settings');

module.exports =
{
    index: function (req, res) {
        res.sendFile(process.env.root + config.indexFile);
    },

    info: function (req, res) {
        res.json({
            name : pkg.name,
            version : pkg.version,
            description : pkg.description,
            env : process.env.NODE_ENV
        });
    },

    api: function (req, res) {
        var apis = [];

        routes.forEach(function (api) {
            if (api.resource.indexOf('/api') !== -1) {
                apis.push({
                    resource: api.resource,
                    method: api.method.toUpperCase()
                });
            }
        });

        res.json(apis);
    }
}
