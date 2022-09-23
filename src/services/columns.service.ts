import axios from 'axios';
import { getCookie } from '../helpers/cookie';
import { IColumnToUpdate, IColumnToGetById, IColumnToAdd, IColumnToDelete } from '../store/columns/columns.slice';
import { API_URL } from '../constants/api';

// Get all columns
const getColumns = async (boardId: string) => {
  const token = getCookie('user') || null;
  const response = await axios.get(
    `${API_URL}/boards/${boardId}/columns`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Create column
const createColumn = async (column: IColumnToAdd) => {
  const token = getCookie('user') || null;
  const response = await axios.post(
    `${API_URL}/boards/${column.boardId}/columns`, { title: column.title }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Get column by id
const getColumnById = async (column: IColumnToGetById) => {
  const token = getCookie('user') || null;
  const response = await axios.get(
    `${API_URL}/boards/${column.boardId}/columns/${column.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Delete column
const deleteColumn = async (column: IColumnToDelete) => {
  const token = getCookie('user') || null;
  await axios.delete(
    `${API_URL}/boards/${column.boardId}/columns/${column.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return column.id;
}

// Update column
const updateColumn = async (column: IColumnToUpdate) => {
  const token = getCookie('user') || null;
  const response = await axios.put(
    `${API_URL}/boards/${column.boardId}/columns/${column.id}`, {
      title: column.title,
      order: column.order
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const columnsService = {
  getColumns,
  createColumn,
  getColumnById,
  deleteColumn,
  updateColumn,
};

export default columnsService;
