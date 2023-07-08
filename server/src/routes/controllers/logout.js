const { logger } = require("../../utils/logger");

const logout = (req, res) => {
  const { accountUUID } = req;
  logger.info(`[${accountUUID}] logged out successfully.`)
  res.json({ success: true, message: 'Logout Successful' });
};

module.exports = { logout };
