const Users = require('../../models/users');
const { logger } = require('../../utils/logger');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User Not Found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid Password' });
    }
    res.json({ success: true, message: 'Login Successful' });
    // * logged in logger here
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { login };
