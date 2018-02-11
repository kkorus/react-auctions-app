const _ = require('lodash');
const { User } = require('../models/user');
const { validateUser } = require('../middleware/validateUser');

function registerUsersController(server) {
    // creates new user
    server.post('/api/users', validateUser, async (req, res) => {
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
    server.post('/api/users/login', validateUser, async (req, res) => {
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
