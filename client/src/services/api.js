import axios from 'axios';
import { config } from "../config/config";

export const loginAction = async (username, password) => {
  return await axios.post(config.api.login, { username, password });
};

export const signupAction = async (username, email, password) => {
  return await axios.post(config.api.signup, { username, email, password });
};

export const registerAction = async (merchantData, accountUUID) => {
  return await axios.post(config.api.register, merchantData, { headers: { accountUUID } });
};

export const logoutAction = async (accountUUID) => {
  return await axios.put(config.api.logout, null, { headers: { accountUUID } });
};
