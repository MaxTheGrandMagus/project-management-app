import axios from 'axios';
import { API_URL } from '../utils/constants/api';
import { getCookie } from '../helpers/cookie';

// Get all users
const getUsers = async () => {
  const token = getCookie('user') || null;
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get user by id
const getUserById = async (id: string) => {
  const token = getCookie('user') || null;
  const response = await axios.get(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update user profile by id
const updateUserProfile = async (userData: {
  id: string;
  name: string;
  login: string;
  password: string;
}) => {
  const token = getCookie('user') || null;
  const response = await axios.put(
    `${API_URL}/users/${userData.id}`,
    {
      name: userData.name,
      login: userData.login,
      password: userData.password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};


const deleteUser = async (id: string) => {
  const token = getCookie('user') || null;
  const response = await axios.delete(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status.toString();
};

const userService = {
  getUsers,
  getUserById,
  updateUserProfile,
  deleteUser,
};

export default userService;
