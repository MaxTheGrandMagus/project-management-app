import { AnyAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import boardsService from './boards.service';
import { IError } from '../config';

export interface BoardColumnTaskProps {
  id?: string;
  title: string;
  description: string;
  columns: Array<ColumnTaskProps>;
  toggleDeleteWindow?: () => void;
  toggleUpdateWindow?: () => void;
}

export interface ColumnTaskProps {
  id: string;
  title: string;
  order: number;
  tasks: Array<TaskProps>;
}

export interface TaskProps {
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
    Array<Pick<BoardColumnTaskProps, "id" | "title" | "description">>, 
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
    Pick<BoardColumnTaskProps, "title" | "description">,
    Pick<BoardColumnTaskProps, "title" | "description">,
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
    BoardColumnTaskProps, 
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

export const deleteBoard = createAsyncThunk(
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
    Pick<BoardColumnTaskProps, 'id' | 'title' | 'description'>, 
    Pick<BoardColumnTaskProps, 'id' | 'title' | 'description'>, 
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
  boards: Array<Pick<BoardColumnTaskProps, "id" | "title" | "description">>,
  boardColumnsTasks: BoardColumnTaskProps;
  isLoading: boolean,
  isError: boolean,
  message: string | undefined,
  currentBoard: {
    id: string,
    title: string,
    description: string,
  },
  newBoard: Pick<BoardColumnTaskProps, "title" | "description"> | null,
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
  isError: false,
  message: undefined,
  currentBoard: {
    id: '',
    title: '',
    description: '',
  },
  newBoard: {
    title: '',
    description: '',
  },
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
    resetBoard(state, action) {
      state.newBoard = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.isLoading = false;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.newBoard = action.payload;
        state.boards.push(state.newBoard);
        state.isLoading = false;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBoardById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.boardColumnsTasks = action.payload;
        state.boardColumnsTasks.columns.sort((a, b) => a.order - b.order)
        state.isLoading = false;
      })
      .addCase(getBoardById.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        console.log(action.payload);
        state.boards = state.boards.filter((board) => board.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteBoard.rejected, (state, action: AnyAction) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBoard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.boards = state.boards.map((board) => {
          if (board.id === action.payload.id) {
            return action.payload;
          }
          return board;
        });
        state.isLoading = false;
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { openBoard, chooseBoard, resetBoard } = boardSlice.actions;

export default boardSlice.reducer;
