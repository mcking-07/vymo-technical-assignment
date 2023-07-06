const logout = (req, res) => {
  // * logged out logger here
  res.json({ success: true, message: 'Logout Successful' });
};

module.exports = { logout };
