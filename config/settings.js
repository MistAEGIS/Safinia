var settings =
{
    port: process.env.PORT || 5000,
    mongodb: 'mongodb://localhost:27017',
    publicFolder: '/',
    indexFile: '/index.html',
    cache: { maxAge: 86400000 }
}

settings.env = typeof process.env.NODE_ENV == 'undefined' ? 'development' : process.env.NODE_ENV.trim();

switch (settings.env)
{
    case 'development':
        settings.cache.maxAge = 0;
        break;

    case 'staging':
        break;

    case 'production':
        break;
}

module.exports = settings;
