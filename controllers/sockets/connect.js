module.exports =
{
    connected: function (socket, io, data, callback) {
        socket.user = socket.request.session.user;

        if (!socket.user) return;

        socket.broadcast.emit('server.connection', { user: socket.user });
        socket.join('');
    },

    disconnected: function (socket, io, data, callback) {
        if (!socket.user) return;

        socket.broadcast.emit('server.disconnect', { user: socket.user });
        socket.leave('');
    }
}
