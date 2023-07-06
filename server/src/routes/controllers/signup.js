const { v4: uuidv4 } = require('uuid');
const Users = require('../../models/users');
const { logger } = require('../../utils/logger');

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: 'User Already Exists' });
    }
    const accountUUID = uuidv4();
    const user = new Users({ username, email, password, accountUUID });
    await user.save();
    // * user created logger here
    res.json({ success: true, message: 'Signup Successful', accountUUID });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signup };
