module.exports =
{
    connected: function (socket, io, data, callback) {
        console.log('new socket connection');

        socket.user = socket.request.session.user;

        if (!socket.user) return;

        socket.broadcast.emit('server.connection', { user: socket.user });
        socket.join('');
    },

    disconnected: function (socket, io, data, callback) {
        console.log('socket disconnected');

        if (!socket.user) return;

        socket.broadcast.emit('server.disconnect', { user: socket.user });
        socket.leave('');
    }
}
