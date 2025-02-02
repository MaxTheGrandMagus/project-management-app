import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import columnsService from '../../services/columns.service';
import { IError } from '../config';

interface IColumn {
  id: string;
  title: string;
  order: number;
}

interface IColumnTasks {
  id: string;
  title: string;
  order: number;
  tasks: Array<{
    id: string,
    title: string,
    order: number | null,
    description: string,
    userId: string,
    files?: Array<FileProps> | [],
  }>;
}

interface FileProps {
  filename: string,
  fileSize: number,
}

export interface IColumnToAdd {
  title: string;
  boardId: string;
}

export interface IColumnToGetById {
  boardId: string;
  id: string;
}

export interface IColumnToDelete {
  boardId: string;
  id: string;
}

export interface IColumnToUpdate {
  boardId: string;
  id: string;
  title: string;
  order: number;
}

export const getColumns = createAsyncThunk<
  Array<IColumn>,
  string,
  { rejectValue: string }
>(
  'columns/getColumns',
  async (boardId: string, { rejectWithValue }) => {
    try {
      return await columnsService.getColumns(boardId);
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const createColumn = createAsyncThunk<
  IColumn,
  IColumnToAdd,
  { rejectValue: string }
>(
  'columns/createColumn',
  async (column: IColumnToAdd, { rejectWithValue }) => {
    try {
      return await columnsService.createColumn(column);
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const getColumnById = createAsyncThunk<
  IColumnTasks,
  IColumnToGetById,
  { rejectValue: string }
>(
  'columns/getColumnById',
  async (column: IColumnToGetById, { rejectWithValue }) => {
    try {
      return await columnsService.getColumnById(column);
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteColumn = createAsyncThunk<
  string,
  IColumnToDelete,
  { rejectValue: string }
>(
  'columns/deleteColumn',
  async (column: IColumnToDelete, { rejectWithValue }) => {
    try {
      return await columnsService.deleteColumn(column);
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateColumn = createAsyncThunk<
  IColumn,
  IColumnToUpdate,
  { rejectValue: string }
>(
  'columns/updateColumn',
  async (column: IColumnToUpdate, { rejectWithValue }) => {
    try {
      return await columnsService.updateColumn(column);
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

interface IColumnState {
  columns: Array<IColumn>;
  columnById: IColumnTasks | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | undefined;
}

const initialState: IColumnState = {
  columns: [],
  columnById: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColumns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColumns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.columns = action.payload;
      })
      .addCase(getColumns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getColumnById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColumnById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.columnById = action.payload;
      })
      .addCase(getColumnById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export default columnsSlice.reducer;
