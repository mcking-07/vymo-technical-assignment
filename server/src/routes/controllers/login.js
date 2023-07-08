const Users = require('../../models/users');
const Merchants = require('../../models/merchants');
const { logger } = require('../../utils/logger');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ username }).lean();
    if (!user) {
      return res.json({ error: 'User Not Found' });
    }
    if (user.password !== password) {
      return res.json({ error: 'Invalid Password' });
    }
    const { accountUUID } = user;
    const merchant = await Merchants.findOne({ accountUUID }).lean();
    const returnObject = { success: true, message: 'Login Successful', accountUUID };
    if (!merchant) {
      logger.info(`[${accountUUID}] [reg-pending] logged in successfully.`)
      return res.json({ ...returnObject, regStatus: false });
    }
    logger.info(`[${accountUUID}] [reg-complete] logged in successfully.`)
    res.json({ ...returnObject, regStatus: true, merchantData: merchant });
  } catch (error) {
    logger.error(error);
    res.json({ error: 'Internal Server Error' });
  }
};

module.exports = { login };
