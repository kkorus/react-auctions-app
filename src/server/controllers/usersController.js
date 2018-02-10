const _ = require('lodash');
const { User } = require('../models/user');

var userValidationMiddleware = function (req, res, next) {
    const errors = [];
    const body = _.pick(req.body, ['name', 'password']);
    const { name, password } = body;

    if (!name || name.length < 3) {
        errors.push('Nazwa musi mieć co najmniej 3 znaki');
    }

    if (!password || password.length < 6) {
        errors.push('Hasło musi mieć co najmniej 6 znakow');
    }

    if (errors.length > 0) {
        return res.status(400).send({ errors });
    }

    next();
};

function registerUsersController(server) {
    // creates new user
    server.post('/api/users', userValidationMiddleware, async (req, res) => {
        try {
            const body = _.pick(req.body, ['name', 'password']);
            const user = new User(body);
            await user.save();
            const token = await user.generateAuthToken();
            res.header('x-auth', token).send(user);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });

    // login user
    server.post('/api/users/login', userValidationMiddleware, async (req, res) => {
        try {
            const body = _.pick(req.body, ['name', 'password']);
            const user = await User.findByCredentials(body.name, body.password);
            const token = await user.generateAuthToken();
            res.header('x-auth', token).send(user);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });
}

module.exports = { registerUsersController };
