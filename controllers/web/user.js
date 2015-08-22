var User = require(process.env.root + '/models/user');

module.exports =
{
    list: function (req, res) {
        User.find({})
        .exec()
        .then(function (users) {
            res.json(users);
        });
    },

    get: function (req, res) {
        User.findOne({ _id: req.params.id })
        .exec()
        .then(function (user) {
            if (!user) return res.status(404).send('User not found');
            res.json(user);
        }, function (err) {
            res.status(404).send('User not found');
        });
    },

    add: function (req, res) {
        var user = new User()
        user.setValues(req.body);

        if (!user.hasProperties(['email', 'password', 'firstName', 'lastName'])) {
            return res.status(412).send('Email, password, and a name are required');
        }

        User.findOne({ email: user.email })
        .exec()
        .then(function (exists) {
            if (exists) return res.status(412).send('User with email ' + user.email + ' already exists');

            user.save()
            .then(function (user) {
                res.status(201).json(user);
            });
        });
    },

    update: function (req, res) {
        if (!req.session.user) return res.status(401).send('Unauthorized');

        User.findOne({ _id: req.params.id })
        .select('+password')
        .exec()
        .then(function (user) {
            if (!user) return res.status(404).send('User not found');
            if (user.email !== req.session.user.email) return res.status(403).send('Not allowed to modify another user');

            user.setValues(req.body);

            if (!user.hasProperties(['email', 'password', 'firstName', 'lastName'])) {
                return res.status(412).send('Email, password, and a name are required');
            }

            user.save()
            .then(function (user) {
                req.session.user = user.sanitize(['password']);
                res.status(200).json(req.session.user);
            });
        }, function (err) {
            res.status(404).send('User not found');
        });
    },

    delete: function (req, res) {
        if (!req.session.user) return res.status(401).send('Unauthorized');

        User.findOne({ _id: req.params.id })
        .exec()
        .then(function (user) {
            if (!user) return res.status(404).send('User not found');
            if (user.email !== req.session.user.email) return res.status(403).send('Not allowed to delete another user');

            user.remove();
            res.status(204).end();
        }, function (err) {
            res.status(404).send('User not found');
        });
    }
}
