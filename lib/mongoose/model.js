var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (name, properties, options, methods, statics) {
    // options
    options.strict = false;

    // schema
    var schema = new Schema(properties, options);

    // getters and setters
    schema.set('toJSON', { transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }});

    // methods
    schema.methods.setValues = function (values) {
        for (var key in values) {
            if (typeof values[key] === 'string' && values[key].trim() === '') continue;
            if (this.schema.statics.imutable.indexOf(key) > -1) continue;
            this.set(key, values[key]);
        }

        return this;
    };

    schema.methods.hasProperties = function (properties) {
        for (var i in properties) {
            var key = properties[i];

            if(typeof this.get(key) === 'undefined' || this.get(key) === null || this.get(key).trim() == '') {
                return false;
            }
        }

        return true;
    };

    schema.methods.sanitize = function (properties) {
        for (var i in properties) {
            var key = properties[i];
            this.set(key, undefined);
        }

        return this;
    };

    // statics
    schema.statics.sanitize = function (docs, properties) {
        for (var key in docs) {
            docs[key].sanitize(properties);
        }

        return docs;
    };

    schema.statics.imutable = ['_id', 'id', '_v'];

    // virtuals
    schema.virtual('req') // you can store request/session information in here
    .get(function () { return this._req; })
    .set(function (value) { this._req = value; });

    // override methods and statics
    for (var key in methods) {
        schema.methods[key] = methods[key];
    };

    for (var key in statics) {
        schema.statics[key] = statics[key];
    };

    return mongoose.model(name, schema);
}
