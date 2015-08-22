module.exports =
{
    join: function (socket, io, data, callback) {
        if (!data || !data.room || !socket.user) return;

        socket.join(data.room);
        socket.broadcast.to(data.room).emit('server.room.join', { user: socket.user, room: data.room });
    },

    leave: function (socket, io, data, callback) {
        if (!data || !data.room || !socket.user) return;

        socket.broadcast.to(data.room).emit('server.room.leave', { user: socket.user, room: data.room });
        socket.leave(data.room);
    },

    listConnectedClients: function (socket, io, data, callback) {
        if (!data) data = {};
        if (!data.room) data.room = '';

        var connected = [];

        for (var id in io.sockets.adapter.rooms[data.room]) {
            for (var key in io.sockets.connected) {
                if (io.sockets.connected[key].id === id) connected.push(io.sockets.connected[key].user);
            }
        }

        callback(connected);
    }
}
