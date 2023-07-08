const { config } = require("../config/config");

const MIN_PASSWORD_LENGTH = 8;

const waitForSomeTime = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

const isValidUsername = (username) => {
	return config.regex.username.test(username);
};

const isValidEmail = (email) => {
	return config.regex.email.test(email);
};

const isValidPassword = (password) => {
	return password.length >= MIN_PASSWORD_LENGTH;
};

const isValidPhoneNumber = (phoneNumber) => {
	return config.regex.phone.test(phoneNumber);
};

const isValidPincode = (pincode) => {
	return config.regex.number.test(pincode);
};

const isValidWebsite = (website) => {
	return config.regex.website.test(website);
};

const isValidAverageDailyTransactions = (averageDailyTransactions) => {
	return config.regex.number.test(averageDailyTransactions);
};

module.exports = {
  waitForSomeTime, isValidUsername, isValidPassword, isValidEmail, isValidPhoneNumber,
  isValidPincode, isValidWebsite, isValidAverageDailyTransactions,
};
