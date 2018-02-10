const _ = require('lodash');
const { ObjectID } = require('mongodb');
const { Auction } = require('../models/auction');
const { Category } = require('../models/category');
const { Province } = require('../models/province');
const { authenticate } = require('../middleware/authenticate');

function registerAuctionsController(server) {
    // returns list of auction categories
    server.get('/api/categories', authenticate, async (req, res) => {
        try {
            const categories = await Category.find({});
            res.send({ categories });
        } catch (e) {
            res.status(400).send(e);
        }
    });

    // returns list of auction provinces
    server.get('/api/provinces', authenticate, async (req, res) => {
        try {
            const provinces = await Province.find({});
            res.send({ provinces });
        } catch (e) {
            res.status(400).send(e);
        }
    });

    // return list of auctions
    server.get('/api/auctions', authenticate, async (req, res) => {
        const { desc, category, province } = req.query;
        let search = {};

        if (desc && desc.length > 0) {
            search.desc = { "$regex": req.query.desc, "$options": "i" };
        }

        if (ObjectID.isValid(category)) {
            search.category = category;
        }

        if (ObjectID.isValid(province)) {
            search.province = province;
        }

        try {
            const auctions = await Auction
                .find(search)
                .populate('category')
                .populate('user')
                .populate('province');

            res.send({ auctions });
        } catch (e) {
            res.status(400).send(e);
        }
    });

    // return auction by id
    server.get('/api/auctions/:id', async (req, res) => {
        try {
            const auction = await Auction
                .findOne({ _id: req.params.id })
                .populate('category')
                .populate('user')
                .populate('province');

            res.send({ auction });
        } catch (e) {
            res.status(400).send(e);
        }
    });

    // creates new auction
    server.post('/api/auctions', authenticate, async (req, res) => {
        try {
            console.log(req.body);
            const body = _.pick(req.body, ['desc', 'category', 'province', 'user']);
            const auction = new Auction(body);
            await auction.save();
            res.status(201).end();
        } catch (e) {
            res.status(400).send(e);
        }
    });

    // deletes auction
    server.delete('/api/auctions/:id', authenticate, async (req, res) => {
        const id = req.params.id;
        if (!ObjectID.isValid(id)) {
            return res.sendStatus(404);
        }

        try {
            const auction = await Auction.findOneAndRemove({
                _id: id
            });
            if (!auction) return res.sendStatus(404);

            return res.send({ auction });
        } catch (e) {
            res.status(400).send();
        }
    });

    // updates auction
    server.patch('/api/auctions/:id', authenticate, async (req, res) => {
        try {
            const id = req.params.id;
            const body = _.pick(req.body, ['desc', 'category', 'province']);

            if (!ObjectID.isValid(id)) {
                return res.sendStatus(404);
            }

            const auction = await Auction.findOneAndUpdate(
                {
                    _id: id
                    // _creator: req.user._id
                },
                {
                    $set: body
                },
                {
                    new: true
                }
            );

            if (!auction) {
                return res.sendStatus(404);
            }

            res.send({ auction });
        } catch (e) {
            res.sendStatus(400);
        }
    });
}

module.exports = { registerAuctionsController };
