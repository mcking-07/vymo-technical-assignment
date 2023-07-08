const { v4: uuidv4 } = require('uuid');
const Users = require('../../models/users');
const { logger } = require('../../utils/logger');

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ $or: [{ username }, { email }] }).lean();
    if (existingUser) {
      return res.json({ error: 'User Already Exists' });
    }
    const accountUUID = uuidv4();
    const user = new Users({ username, email, password, accountUUID });
    await user.save();
    logger.info(`[${accountUUID}] user created successfully.`)
    res.json({ success: true, message: 'Signup Successful', accountUUID });
  } catch (error) {
    logger.error(error);
    res.json({ error: 'Internal Server Error' });
  }
};

module.exports = { signup };
