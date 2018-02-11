const mongoose = require('mongoose');

const ProvinceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        unique: true
    }
});

const Province = mongoose.model('Province', ProvinceSchema);

module.exports = { Province };
