const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
    desc: {
        type: String,
        require: true,
        trim: true,
        minlength: 10,
        unique: false
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    province: { type: mongoose.Schema.Types.ObjectId, ref: 'Province' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Auction = mongoose.model('Auction', AuctionSchema);

module.exports = { Auction };
