import axios from 'axios';
import { ITaskToCreate, ITaskToGetById, ITaskToDelete, ITaskToUpdate } from './tasks.slice';
import { getCookie } from '../../helpers/cookie';
import { API_URL } from '../../constants/api';

// Get all tasks
const getTasks = async (tasksToGet: { boardId: string, columnId: string }) => {
  const token = getCookie('user') || null;
  const response = await axios.get(
    `${API_URL}/boards/${tasksToGet.boardId}/columns/${tasksToGet.columnId}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Create task
const createTask = async (taskToCreate: ITaskToCreate) => {
  const token = getCookie('user') || null;
  const response = await axios.post(
    `${API_URL}/boards/${taskToCreate.boardId}/columns/${taskToCreate.columnId}/tasks`, { 
      title: taskToCreate.task.title,
      description: taskToCreate.task.description,
      userId: taskToCreate.task.userId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Get task by id
const getTaskById = async (taskToGetById: ITaskToGetById) => {
  const token = getCookie('user') || null;
  const response = await axios.get(
    `${API_URL}/boards/${taskToGetById.boardId}/columns/${taskToGetById.columnId}/tasks/${taskToGetById.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Delete task
const deleteTask = async (taskToDelete: ITaskToDelete) => {
  const token = getCookie('user') || null;
  await axios.delete(
    `${API_URL}/boards/${taskToDelete.boardId}/columns/${taskToDelete.columnId}/tasks/${taskToDelete.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return taskToDelete;
}

// Update task
const updateTask = async (taskToUpdate: ITaskToUpdate) => {
  const token = getCookie('user') || null;
  const response = await axios.put(
    `${API_URL}/boards/${taskToUpdate.boardId}/columns/${taskToUpdate.columnId}/tasks/${taskToUpdate.id}`, {
      title: taskToUpdate.task.title,
      order: taskToUpdate.task.order,
      description: taskToUpdate.task.description,
      userId: taskToUpdate.task.userId,
      boardId: taskToUpdate.task.boardId,
      columnId: taskToUpdate.task.columnId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const tasksService = {
  getTasks,
  createTask,
  getTaskById,
  deleteTask,
  updateTask,
};

export default tasksService;
