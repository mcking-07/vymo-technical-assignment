const Users = require('../models/users');
const { logger } = require('../utils/logger');

const auth = async (req, res, next) => {
  try {
    const accountUUID = req.header('accountUUID');
    const user = await Users.findOne({ accountUUID });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;
    req.accountUUID = accountUUID;
    // * add user authenticated logs
    next();
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { auth };
