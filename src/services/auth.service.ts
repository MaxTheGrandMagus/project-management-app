import axios from 'axios';
import { API_URL } from '../utils/constants/api';

// Register user
const signup = async (userData: {
  name: string;
  login: string;
  password: string;
}) => {
  await axios.post(`${API_URL}/signup`, userData);
  const { login, password } = userData;
  const signInData = { login, password };
  const response = await axios.post(`${API_URL}/signin`, signInData);
  return response.data;
};

// Login user
const signin = async (userData: {
  login: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/signin`, userData);
  return response.data;
};

const authService = {
  signup,
  signin,
};

export default authService;
