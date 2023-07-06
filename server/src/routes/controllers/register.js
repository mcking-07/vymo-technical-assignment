const Merchants = require('../../models/merchants');
const { logger } = require('../../utils/logger');

const register = async (req, res) => {
  const { accountUUID } = req;
  const { restaurantName, contactName, pincode, address, website, phoneNumber, averageDailyTransactions } = req.body;

  try {
    const merchant = new Merchants({
      restaurant: {
        name: restaurantName,
        address: location,
        pincode,
        website,
        averageDailyTransactions: avgDailyTransactions,
      },
      contact: {
        name: contactName,
        phone: phoneNumber,
      },
      accountUUID,
    });
    await merchant.save();
    // * registered logger here
    res.json({ success: true, message: 'Merchant Registration Successful' });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { register };
