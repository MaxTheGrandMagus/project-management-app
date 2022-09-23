import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import boardsService from '../../services/boards.service';
import { IError } from '../config';
import { createColumn, deleteColumn, updateColumn } from '../columns/columns.slice';
import { createTask, deleteTask, updateTask } from '../tasks/tasks.slice';

export interface IBoardColumnsTasks {
  id?: string;
  title: string;
  description: string;
  columns: Array<IColumnTasks>;
  toggleDeleteWindow?: () => void;
  toggleUpdateWindow?: () => void;
}

interface IColumnTasks {
  id: string;
  title: string;
  order: number;
  tasks: Array<ITask>;
}

export interface ITask {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  files?: Array<FileProps> | [],
}

interface FileProps {
  filename: string,
  fileSize: number,
}

export const getBoards = createAsyncThunk<
  Array<Pick<IBoardColumnsTasks, "id" | "title" | "description">>, 
  undefined, 
  { rejectValue: string }
>(
  'boards/getBoards', 
  async function (_, { rejectWithValue }) {
    try {
      return await boardsService.getBoards();
    } catch (error) {
      const errorMassage = (error as IError).message;
      return rejectWithValue(errorMassage);
    }
  }
);

export const createBoard = createAsyncThunk<
  Pick<IBoardColumnsTasks, "id" | "title" | "description">,
  Pick<IBoardColumnsTasks, "title" | "description">,
  { rejectValue: string }
>(
  'boards/createBoard',
  async function (board, { rejectWithValue }) {
    try {
      return await boardsService.createBoard(board);
    } catch (error) {
      const errorMassage = (error as IError).message;
      return rejectWithValue(errorMassage);
    }
  }
);

export const getBoardById = createAsyncThunk<
  IBoardColumnsTasks, 
  string, 
  { rejectValue: string }
>(
  'boards/getBoardById',
  async function (boardId, { rejectWithValue }) {
    try {
      return await boardsService.getBoardById(boardId);
    } catch (error) {
      const errorMassage = (error as IError).message;
      return rejectWithValue(errorMassage);
    }
  }
);

export const deleteBoard = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'boards/deleteBoard',
  async function (boardId: string, { rejectWithValue }) {
    try {
      return await boardsService.deleteBoard(boardId);
    } catch (error) {
      const errorMassage = (error as IError).message;
      return rejectWithValue(errorMassage);
    }
  }
);

export const updateBoard = createAsyncThunk<
  Pick<IBoardColumnsTasks, 'id' | 'title' | 'description'>, 
  Pick<IBoardColumnsTasks, 'id' | 'title' | 'description'>, 
  { rejectValue: string }
>(
  'boards/updateBoard',
  async function (board, { rejectWithValue }) {
    try {
      return await boardsService.updateBoard(board);
    } catch (error) {
      const errorMassage = (error as IError).message;
      return rejectWithValue(errorMassage);
    }
  }
);

interface BoardState {
  boards: Array<Pick<IBoardColumnsTasks, "id" | "title" | "description">>,
  boardColumnsTasks: IBoardColumnsTasks;
  currentBoard: {
    id: string,
    title: string,
    description: string,
  } | null,
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  message: string | undefined,
}

const initialState: BoardState = {
  boards: [],
  boardColumnsTasks: {
    id: '',
    title: '',
    description: '',
    columns: [],
  },
  currentBoard: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    chooseBoard(state, action) {
      state.currentBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // BOARDS
      .addCase(getBoards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.boards = action.payload;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.boards.push(action.payload);
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBoardById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.boardColumnsTasks = action.payload;
        state.boardColumnsTasks.columns.sort((a, b) => a.order - b.order);
        state.boardColumnsTasks.columns.forEach(column => {
          column.tasks.sort((a, b) => a.order - b.order);
        });
      })
      .addCase(getBoardById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.boards = state.boards.filter((board) => board.id !== action.payload);
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.boards = state.boards.map((board) => {
          if (board.id === action.payload.id) {
            return action.payload;
          }
          return board;
        });
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // COLUMNS
      .addCase(createColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const newColumn = {
          id: action.payload.id,
          title: action.payload.title,
          order: action.payload.order,
          tasks: [],
        };
        state.boardColumnsTasks.columns.push(newColumn);
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.boardColumnsTasks.columns = state.boardColumnsTasks.columns.filter((column) => column.id !== action.payload);
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.boardColumnsTasks.columns = state.boardColumnsTasks.columns.map((column) => {
          if (column.id === action.payload.id) {
            return {
              id: action.payload.id,
              title: action.payload.title,
              order: action.payload.order,
              tasks: column.tasks,
            } as IColumnTasks;
          }
          return column as IColumnTasks;
        });
      })
      .addCase(updateColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // TASKS
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boardColumnsTasks.columns = state.boardColumnsTasks.columns.map((column) => {
          if (column.id === action.payload.columnId) {
            column.tasks.push(action.payload as ITask);
          }
          return column;
        });
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boardColumnsTasks.columns = state.boardColumnsTasks.columns.map((column) => {
          column.tasks = column.tasks.filter((task) => task.id !== action.payload.id);
          return column;
        });
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
        state.boardColumnsTasks.columns = state.boardColumnsTasks.columns.map((column) => {
          column.tasks = column.tasks.map((task) => {
            if (task.id === action.payload.id) {
              return action.payload as ITask;
            }
            return task;
          });
          return column;
        });
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { chooseBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
