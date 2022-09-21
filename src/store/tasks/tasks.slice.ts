import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tasksService from './tasks.service';
import { UserProps } from '../../interfaces/interfaces';
import { IError } from '../config';

export interface ITask {
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

export interface FileProps {
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

export interface TaskState {
  tasks: Array<ITask>;
  isLoading: boolean;
  isError: boolean;
  boardId: string;
  columnId: string;
  newTask: ITask | null;
  newColumn: IColumnTasks;
  message: string | undefined;
  colTasks: BoardColTask;
  currentTask: ITask;
  users: Array<UserProps>
}

interface BoardColTask {
  id: string;
  title: string;
  description: string;
  columns: Array<IColumnTasks>;
}

export interface IColumnTasks {
  id: string;
  title: string;
  order: number;
  tasks: Array<ITask>;
  taskClick?: () => void;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  isError: false,
  message: undefined,
  boardId: '',
  columnId: '',
  newTask: {
    id: '',
    title: '',
    order: 0,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
    files: [],
  },
  colTasks: {
    id: '',
    title: '',
    description: '',
    columns: [],
  },
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
  newColumn: {
    id: '',
    title: '',
    order: 1,
    tasks: [],
  },
  users: []
};

const taskSlice = createSlice({
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
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newTask = action.payload;
        state.colTasks.columns.forEach((col) => {
          if (state.newTask != null && col.id === state.newTask.columnId) {
            if (!col.tasks) {
              col.tasks = [];
            }
            col.tasks.push(state.newTask);
          }
        });
      })
      .addCase(createTask.rejected, (state, action) => {
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
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const { columnId, id } = action.payload;
        state.colTasks.columns = state.colTasks.columns.filter(
          (column) => {
            if (column.id === columnId) {
              return column.tasks = column.tasks.filter((task) => task.id !== id)
            } else return column 
          }
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTask = action.payload;
        const { columnId, id } = action.payload;
        state.colTasks.columns = state.colTasks.columns.filter(
          (column) => {
            if (column.id === columnId) {
              let arr = column.tasks.map((task) => {
                if (task.id === id) { 
                  return task = action.payload;
                } else return task;
              })
              column.tasks = arr;
              return column.tasks;
            } else return column 
          }
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { chooseTask, chooseColumnId } = taskSlice.actions;
export default taskSlice.reducer;
