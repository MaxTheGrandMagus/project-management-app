import axios from 'axios';
import { API_URL } from '../../constants/api';
import { getCookie } from '../../helpers/cookie';
import { UserProps } from '../../interfaces/interfaces';

// Get all users
const getUsers = async (): Promise<Array<UserProps>> => {
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

// Delete user by id
const deleteUser = async (id: string) => {
  const token = getCookie('user') || null;
  const response = await axios.delete(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status;
};

const userService = {
  getUsers,
  getUserById,
  updateUserProfile,
  deleteUser,
};

export default userService;
