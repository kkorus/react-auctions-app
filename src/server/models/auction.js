const mongoose = require('mongoose');

var AuctionSchema = new mongoose.Schema({
    desc: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        unique: false
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    province: { type: mongoose.Schema.Types.ObjectId, ref: 'Province' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

var Auction = mongoose.model('Auction', AuctionSchema);

module.exports = { Auction };
