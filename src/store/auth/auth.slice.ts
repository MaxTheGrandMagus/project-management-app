import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './auth.service';
import { IError } from '../config';

export const signup = createAsyncThunk<
  any,
  { name: string; login: string; password: string },
  { rejectValue: string }
>(
  'auth/signup',
  async (user: { name: string; login: string; password: string }, { rejectWithValue }) => {
    try {
      return await authService.signup(user);
    } catch (error) {
      const message = (error as IError).message;
      return rejectWithValue(message);
    }
  }
);

export const signin = createAsyncThunk<
  any,
  { login: string; password: string },
  { rejectValue: string }
>(
  'auth/signin',
  async (user: { login: string; password: string }, { rejectWithValue }) => {
    try {
      return await authService.signin(user);
    } catch (error) {
      const message = (error as IError).message;
      return rejectWithValue(message);
    }
  }
);

interface AuthState {
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  message: string | undefined,
  token: string | null,
}

const initialState: AuthState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
