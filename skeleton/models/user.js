var Model = require(process.env.root + '/lib/mongoose/model');

var properties = {
    email: String,
    password: { type: String, select: false },
    firstName: String,
    lastName: String,
    image: String
}

var options = {}

var methods = {
    getFullName: function () {
        return this.firstName + ' ' + this.lastName;
    },

    setPassword: function (password) {
        this.password = password; // no encryption used for the demo
    },

    setValues: function (values) {
        for (var key in values) {
            if (typeof values[key] === 'string' && values[key].trim() === '') continue;
            if (this.schema.statics.imutable.indexOf(key) > -1) continue;

            if (key === 'password') {
                this.setPassword(values[key]);
            } else {
                this.set(key, values[key]);
            }
        }

        return this;
    }
}

var statics = {};

module.exports = new Model('User', properties, options, methods, statics);
