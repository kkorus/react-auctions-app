const mongoose = require('mongoose');

var ProvinceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        unique: true
    }
});

var Province = mongoose.model('Province', ProvinceSchema);

module.exports = { Province };
