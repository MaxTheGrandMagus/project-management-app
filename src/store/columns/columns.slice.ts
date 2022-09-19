import {
  createSlice,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';
import { getCookie } from '../../helpers/cookie';
import columnsService from './columns.service';
import { API_URL } from '../../constants/api';

interface IError {
  message?: string;
  response: {
    data: {
      message?: string;
    };
  };
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

interface IColumnToAdd {
  title: string;
  boardId: string;
}

interface IColumnToDel {
  id: string;
  boardId: string;
}

export interface IColumnToGetById {
  id: string;
  boardId: string;
}

export interface IColumnToUpdate {
  boardId: string;
  id: string;
  title: string;
  order: number;
}

export interface IColumnState {
  columns: IColumn[];
  columnById: IColumn | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  newColumn: IColumn;
}

const initialState: IColumnState = {
  columns: [],
  columnById: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  newColumn: {
    id: '',
    title: '',
    order: 1,
  },
};

export const getColumns = createAsyncThunk(
  'columns/fetchByBoardIdStatus',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const token = getCookie('user') || null;

      const headers = new Headers({
        Authorization: `Bearer ${token}`,
      });

      const options = {
        method: 'GET',
        headers,
      };
      const response = await fetch(
        `${API_URL}/boards/${boardId}/columns`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const getColumnById = createAsyncThunk(
  'columns/getColumnByIdStatus',
  async (column: IColumnToGetById, { rejectWithValue }) => {
    try {
      return await columnsService.getColumnById(column);
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumnStatus',
  async (column: IColumnToDel, { rejectWithValue }) => {
    try {
      const token = getCookie('user') || null;

      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
      });

      const options = {
        method: 'DELETE',
        headers,
      };
      await fetch(
        `${API_URL}/boards/${column.boardId}/columns/${column.id}`,
        options
      );
      return column;
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const addColumn = createAsyncThunk(
  'columns/addColumnStatus',
  async (column: IColumnToAdd, { rejectWithValue }) => {
    try {
      const token = getCookie('user') || null;

      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      });

      const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: column.title,
        }),
      };
      const response = await fetch(
        `${API_URL}/boards/${column.boardId}/columns`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateColumn = createAsyncThunk(
  'columns/updateColumnStatus',
  async (column: IColumnToUpdate, { rejectWithValue }) => {
    try {
      return await columnsService.updateColumn(column);
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const colSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    resetColumn: (state) => {
      state.columns = [];
      state.columnById = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.newColumn = {
        id: '',
        title: '',
        order: 1,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColumns.fulfilled, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.columns = action.payload;
      })
      .addCase(getColumns.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getColumnById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColumnById.fulfilled, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.columnById = action.payload;
      })
      .addCase(getColumnById.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addColumn.fulfilled, (state, action: AnyAction) => {
        state.newColumn = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.columns.push(state.newColumn);
      })
      .addCase(addColumn.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.columns = state.columns.filter(
          (column) => column.id !== id
        );
      })
      .addCase(updateColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColumn.fulfilled, (state, action: AnyAction) => {
        state.newColumn = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.columns.push(state.newColumn);
      })
      .addCase(updateColumn.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { resetColumn } = colSlice.actions;
export default colSlice.reducer;
