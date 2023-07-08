const { REACT_APP_API_BASE_URL, REACT_APP_SERVER_PORT } = process.env;

const API_URL = REACT_APP_SERVER_PORT ? `${REACT_APP_API_BASE_URL}:${REACT_APP_SERVER_PORT}/api` : `${REACT_APP_API_BASE_URL}/api`;

export const config = {
  api: {
    login: `${API_URL}/login`,
    signup: `${API_URL}/signup`,
    register: `${API_URL}/register`,
    logout: `${API_URL}/logout`,
  },
  regex: {
    username: /^[A-Za-z0-9]+$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    phone: /^[\d-]+$/,
    website: /\w+\.\w+/,
    number: /^\d+$/
  }
};
