const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  restaurant: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    website: { type: String },
    averageDailyTransactions: { type: Number, required: true },
  },
  contact: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  accountUUID: { type: String, required: true, unique: true },
}, {
  collection: 'merchants'
});

const merchants = mongoose.model('Merchant', merchantSchema);

module.exports = merchants;
