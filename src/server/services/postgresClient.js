const pg = require('pg');
const config = require('../config');

function getClient() {
    return new pg.Client(getDbConnectionString());
}

function getDbConnectionString() {
    return `postgres://${config.postgresUser}:${config.postgresPassword}@${config.postgresAddress}:5432/${config.postgresDb}`;
}

module.exports = { getClient };
