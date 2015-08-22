module.exports =
[
    { resource: '/api/users',        method: 'get',       controller: 'user',       action: 'list'           },
    { resource: '/api/users',        method: 'post',      controller: 'user',       action: 'add'            },
    { resource: '/api/users/:id',    method: 'get',       controller: 'user',       action: 'get'            },
    { resource: '/api/users/:id',    method: 'put',       controller: 'user',       action: 'update'         },
    { resource: '/api/users/:id',    method: 'delete',    controller: 'user',       action: 'delete'         },
    { resource: '/api/login',        method: 'post',      controller: 'session',    action: 'authorize'      },
    { resource: '/api/logout',       method: 'get',       controller: 'session',    action: 'unauthorize'    },
    { resource: '/info',             method: 'get',       controller: 'index',      action: 'info'           },
    { resource: '/api',              method: 'get',       controller: 'index',      action: 'api'            },
    { resource: '/*',                method: 'get',       controller: 'index',      action: 'index'          }
];
