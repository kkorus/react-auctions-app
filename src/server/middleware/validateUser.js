const _ = require('lodash');

function validateUser(req, res, next) {
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

module.exports = { validateUser };
