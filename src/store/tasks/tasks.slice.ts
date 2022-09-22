import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tasksService from './tasks.service';
import { IError } from '../config';

interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: Array<FileProps> | [];
}

export interface ITaskToCreate {
  boardId: string;
  columnId: string;
  task: {
    title: string;
    description: string;
    userId: string;
  }
}

export interface ITaskToGetById {
  boardId: string;
  columnId: string;
  id: string;
}

export interface ITaskToDelete {
  boardId: string;
  columnId: string;
  id: string;
}

export interface ITaskToUpdate {
  boardId: string;
  columnId: string;
  id: string;
  task: {
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
  }
}

interface FileProps {
  filename: string,
  fileSize: number,
}

export const getTasks = createAsyncThunk<
  Array<ITask>,
  { boardId: string, columnId: string },
  { rejectValue: string }
>(
  'tasks/getTasks',
  async (tasksToGet: { boardId: string, columnId: string }, { rejectWithValue }) => {
    try {
      return await tasksService.getTasks(tasksToGet);
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const createTask = createAsyncThunk<
  ITask,
  ITaskToCreate,
  { rejectValue: string }
>(
  'tasks/createTask',
  async function (taskToCreate, { rejectWithValue }) {
    try {
      return await tasksService.createTask(taskToCreate);
    } catch (error) {
      const errorMassage = (error as IError).message;
      return rejectWithValue(errorMassage);
    }
  }
);

export const getTaskById = createAsyncThunk<
  ITask,
  ITaskToGetById,
  { rejectValue: string }
>(
  'tasks/getTaskById',
  async (tasksToGetById: ITaskToGetById, { rejectWithValue }) => {
    try {
      return await tasksService.getTaskById(tasksToGetById);
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteTask = createAsyncThunk<
  ITaskToDelete,
  ITaskToDelete,
  { rejectValue: string }
>(
  'tasks/deleteTask',
  async function (taskToDelete: ITaskToDelete, { rejectWithValue }) {
    try {
      return await tasksService.deleteTask(taskToDelete);
    } catch (error) {
      const errorMassage = (error as IError).message;
      return rejectWithValue(errorMassage);
    }
  }
);

export const updateTask = createAsyncThunk<
  ITask,
  ITaskToUpdate,
  { rejectValue: string }
>(
  'tasks/updateTask',
  async function (taskToUpdate, { rejectWithValue }) {
    try {
      return await tasksService.updateTask(taskToUpdate);
    } catch (error) {
      const errorMassage = (error as IError).message;
      return rejectWithValue(errorMassage);
    }
  }
);

interface TaskState {
  tasks: Array<ITask>;
  currentTask: ITask;
  columnId: string;
  isLoading: boolean;
  isError: boolean;
  message: string | undefined;
}

const initialState: TaskState = {
  tasks: [],
  currentTask: {
    id: '',
    title: '',
    order: 0,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
    files: [],
  },
  columnId: '',
  isLoading: false,
  isError: false,
  message: undefined,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    chooseTask(state, action) {
      state.currentTask = action.payload;
    },
    chooseColumnId(state, action) {
      state.columnId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTaskById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTask = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { chooseTask, chooseColumnId } = tasksSlice.actions;
export default tasksSlice.reducer;
