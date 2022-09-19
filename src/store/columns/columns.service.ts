import axios from 'axios';
import { getCookie } from '../../helpers/cookie';
import { IColumnToUpdate, IColumnToGetById } from './columns.slice';
import { API_URL } from '../../constants/api';

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

// Update column
const updateColumn = async (column: IColumnToUpdate) => {
  const token = getCookie('user') || null;
  const response = await axios.put(
    `${API_URL}/boards/${column.boardId}/columns/${column.id}`,
    {
      title: column.title,
      order: column.order
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const columnsService = {
  updateColumn,
  getColumnById,
};

export default columnsService;
