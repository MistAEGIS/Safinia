module.exports =
[
    { topic: 'connection',           controller: 'connect',    action:    'connected',    fire: true },
    { topic: 'disconnect',           controller: 'connect',    action:    'disconnected'             },
    { topic: 'room.join',            controller: 'room',       action:    'join'                     },
    { topic: 'room.leave',           controller: 'room',       action:    'leave'                    },
    { topic: 'room.clients.list',    controller: 'room',       action:    'listConnectedClients'     },
];
