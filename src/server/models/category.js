const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        unique: true
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = { Category };
