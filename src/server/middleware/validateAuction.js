const _ = require('lodash');
const { ObjectID } = require('mongodb');

function validateAuction(req, res, next) {
    const errors = [];
    const body = _.pick(req.body, ['desc', 'category', 'province']);
    const { desc, category, province } = body

    if (!desc || desc.lentgh < 10) {
        errors.push('Opis musi byc dluzysz niz 10 znakow');
    }

    if (!ObjectID.isValid(category)) {
        errors.push('Brakujace pole - kategoria');
    }

    if (!ObjectID.isValid(province)) {
        errors.push('Brakujace pole - wojewodztwo');
    }

    if (errors.length > 0) {
        return res.status(400).send({ errors });
    }

    next();
}

module.exports = { validateAuction };
