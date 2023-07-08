const Merchants = require('../../models/merchants');
const { logger } = require('../../utils/logger');

const register = async (req, res) => {
  const { accountUUID } = req;
  const { restaurantName, contactName, pincode, email, address, website, phoneNumber, averageDailyTransactions } = req.body;
  try {
    const merchant = new Merchants({
      restaurant: {
        name: restaurantName,
        address,
        pincode,
        website,
        averageDailyTransactions,
      },
      contact: {
        name: contactName,
        phone: phoneNumber,
        email: email,
      },
      accountUUID,
      status: 'Successful',
    });
    await merchant.save();
    const merchantData = await Merchants.findOne({ accountUUID }).lean();
    logger.info(`[${accountUUID}] registered successfully.`)
    res.json({ success: true, message: 'Merchant Registration Successful', merchantData });
  } catch (error) {
    logger.error(error);
    res.json({ error: 'Internal Server Error' });
  }
};

module.exports = { register };
