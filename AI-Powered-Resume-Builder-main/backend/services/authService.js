const axios = require("axios");

const API_URL = "http://localhost:5000/api/auth/";

const registerUser = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

module.exports = {
  registerUser,
  loginUser,
};
