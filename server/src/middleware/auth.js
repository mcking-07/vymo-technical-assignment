const Users = require('../models/users');
const { logger } = require('../utils/logger');

const auth = async (req, res, next) => {
  try {
    const accountUUID = req.header('accountUUID');
    const user = await Users.findOne({ accountUUID }).lean();
    if (!user) {
      return res.json({ error: 'Unauthorized' });
    }
    req.user = user;
    req.accountUUID = accountUUID;
    logger.info(`[${accountUUID}] accessing [${req.url}] with [${req.method}] authorized.`)
    next();
  } catch (error) {
    logger.error(error);
    res.json({ error: 'Internal Server Error' });
  }
};

module.exports = { auth };
