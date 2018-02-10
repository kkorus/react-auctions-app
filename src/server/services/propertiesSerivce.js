const pg = require('pg');
const _ = require('lodash');
const { getClient } = require('./postgresClient');

async function getProperties() {
    const query = `SELECT o.name, p.line1, p.line2, p.line3, p.line4, p.city, p.postcode, p.country, op.income
        FROM owners_properties op
        JOIN owners o on o.id = op.owner_id
        JOIN properties p on p.id = op.property_id`;

    const client = getClient();
    await client.connect();

    const response = await client.query(query);
    return response.rows.map(row => mapRowToOwnerData(row));

    function mapRowToOwnerData(row) {
        return {
            owner: row.name,
            income: row.income,
            address: {
                line1: row.line1,
                line2: row.line2,
                line3: row.line3,
                line4: row.line4,
                city: row.city,
                postcode: row.postcode,
                country: row.country
            }
        };
    }
}

async function addProperty(body) {
    const client = getClient();
    await client.connect();

    const insertOwnerQuery = `INSERT INTO owners(name) VALUES ($1) RETURNING id`;
    const ownerId = (await client.query(insertOwnerQuery, Object.values(_.pick(_.merge({ name: null }, body, ), ['owner'])))).rows[0].id;

    const insertPropertyQuery = `INSERT INTO properties(line1, line2, line3, line4, city, postcode, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
    const propertyId = (await client.query(insertPropertyQuery, Object.values(_.merge({
        line1: null,
        line2: null,
        line3: null,
        line4: null,
        city: null,
        postcode: null,
        country: null
    }, body.address)))).rows[0].id;

    const insertOwnerPropertyQuery = `INSERT INTO owners_properties(owner_id, property_id, income) VALUES (${ownerId}, ${propertyId}, ${body.incomeGenerated})`;
    await client.query(insertOwnerPropertyQuery);
}

module.exports = { getProperties, addProperty }
