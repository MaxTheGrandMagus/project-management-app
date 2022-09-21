import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import boardsService from './boards.service';
import { IError } from '../config';

export interface IBoardColumnsTasks {
  id?: string;
  title: string;
  description: string;
  columns: Array<IColumnTasks>;
  toggleDeleteWindow?: () => void;
  toggleUpdateWindow?: () => void;
}

export interface IColumnTasks {
  id: string;
  title: string;
  order: number;
  tasks: Array<ITask>;
}

export interface ITask {
  id: string,
  title: string,
  order: number | null,
  description: string,
  userId: string,
  files?: Array<FileProps> | [],
}

export interface FileProps {
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

export interface BoardState {
  boards: Array<Pick<IBoardColumnsTasks, "id" | "title" | "description">>,
  boardColumnsTasks: IBoardColumnsTasks;
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  message: string | undefined,
  currentBoard: {
    id: string,
    title: string,
    description: string,
  },
  newBoard: Pick<IBoardColumnsTasks, "title" | "description"> | null,
}

const initialState: BoardState = {
  boards: [],
  boardColumnsTasks: {
    id: '',
    title: '',
    description: '',
    columns: [],
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
  currentBoard: {
    id: '',
    title: '',
    description: '',
  },
  newBoard: null,
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    openBoard(state, action) {
      state.currentBoard = action.payload;
    },
    chooseBoard(state, action) {
      state.currentBoard = action.payload;
    },
    resetNewBoard(state, action) {
      state.newBoard = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.newBoard = action.payload;
        state.boards.push(state.newBoard);
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
        state.boardColumnsTasks.columns.sort((a, b) => a.order - b.order)
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
  },
});

export const { openBoard, chooseBoard, resetNewBoard } = boardSlice.actions;

export default boardSlice.reducer;
