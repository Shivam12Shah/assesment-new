const mongoose = require('mongoose');

const orderDetailsSchema = new mongoose.Schema({
	userName: { type: String, required: true },
	userEmail: { type: String, required: true },
	cartItems: [
		{
			id: Number,
			name: String,
			image: String,
			price: Number,
			description: String,
			category: String,
			in_stock: Boolean,
			qty: Number
		}
	],
	totalAmount: { type: Number, required: true },
	paymentIntentId: { type: String, required: true },
	status: { type: String, enum: ['success', 'failed'], required: true },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderDetails', orderDetailsSchema);
