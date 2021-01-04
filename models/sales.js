const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
	id: String,
	itemId: String,
	itemName: String,
	itemPrice: Number,
	itemQty: Number,
	totalPrice: String,
	updated: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Sales', salesSchema);
