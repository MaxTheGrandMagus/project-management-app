import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BoardProps } from '../../components/interfaces';
import { getCookie } from '../../helpers/cookie';
import { API_URL } from '../../constants/api';
import { IError } from '../config';

export const getBoards = createAsyncThunk<
  BoardProps[],
  undefined,
  { rejectValue: string }
>('boards/getBoards', async function (_, { rejectWithValue }) {
  try {
    const token = getCookie('user') || null;
    const response = await fetch(`${API_URL}/boards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    const errorMassage = (error as IError).message;
    return rejectWithValue(errorMassage);
  }
});

export const createBoard = createAsyncThunk<
  BoardProps,
  BoardProps,
  { rejectValue: string }
>(
  'boards/createBoard',
  async function (board, { rejectWithValue, dispatch }) {
    try {
      const token = getCookie('user') || null;

      const response = await fetch(`${API_URL}/boards`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(board),
      });
      const data = await response.json();
      return data;
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
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const token = getCookie('user') || null;

      await fetch(`${API_URL}/boards/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      const errorMassage = (error as IError).message;
      return rejectWithValue(errorMassage);
    }
  }
);

export interface BoardState {
  boards: Array<BoardProps>,
  loading: boolean,
  error: boolean,
  currentId: string,
  newBoard: BoardProps | null,
  message: string | undefined,
}

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: false,
  currentId: '',
  newBoard: {
    title: '',
    description: '',
  },
  message: undefined,
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    openboard(state, action) {
      state.currentId = action.payload;
    },
    chooseBoardId(state, action) {
      state.currentId = action.payload;
    },
    resetBoard(state, action) {
      state.newBoard = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.loading = false;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.error = true;
        state.message = action.payload;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => board.id !== action.payload
        );
      })
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.newBoard = action.payload;
        state.loading = false;
        state.boards.push(state.newBoard);
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { openboard, chooseBoardId, resetBoard } =
  boardSlice.actions;

export default boardSlice.reducer;
