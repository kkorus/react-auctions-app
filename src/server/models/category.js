const mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		trim: true,
		minlength: 1,
		unique: true
	}
});

var Category = mongoose.model('Category', CategorySchema);

module.exports = { Category };
