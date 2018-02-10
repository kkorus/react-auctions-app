const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');
const seedDatabase = require('./db/seed');
const { mongoose } = require('./db/mongoose');
const { registerAuctionsController } = require('./controllers/auctionsController');
const { registerUsersController } = require('./controllers/usersController');

seedDatabase();
const server = express();

server.use(bodyParser.json());
server.use(express.static(__dirname + '/../../public'));
server.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/index.html'));
});

registerAuctionsController(server);
registerUsersController(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Auctions server started on ${port}.`);
});

module.exports = { server };
