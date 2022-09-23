import axios from 'axios';
import { getCookie } from '../helpers/cookie';
import { API_URL } from '../constants/api';
import { IBoardColumnsTasks } from '../store/boards/boards.slice';

// Get all boards
const getBoards = async (): Promise<Array<Pick<IBoardColumnsTasks, "id" | "title" | "description">>> => {
  const token = getCookie('user') || null;
  const response = await axios.get(`${API_URL}/boards`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Create board
const createBoard = async (board: Pick<IBoardColumnsTasks, "title" | "description">) => {
  const token = getCookie('user') || null;
  const response = await axios.post(`${API_URL}/boards`, board, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get board by id
const getBoardById = async (boardId: string) => {
  const token = getCookie('user') || null;
  const response = await axios.get(`${API_URL}/boards/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete board
const deleteBoard = async (boardId: string) => {
  const token = getCookie('user') || null;
  await axios.delete(`${API_URL}/boards/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return boardId;
};

// Update board
const updateBoard = async (board: Pick<IBoardColumnsTasks, 'id' | 'title' | 'description'>) => {
  const token = getCookie('user') || null;
  const response = await axios.put(`${API_URL}/boards/${board.id}`, 
    { title: board.title, description: board.description }, 
    { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const boardsService = {
  getBoards,
  createBoard,
  getBoardById,
  deleteBoard,
  updateBoard,
};

export default boardsService;
