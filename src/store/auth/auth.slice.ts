import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import authService from './auth.service';

interface IError {
  message?: string;
  response: {
    data: {
      message?: string;
    };
  };
}

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

//Register user
export const signup = createAsyncThunk(
  'auth/signup',
  async (user: { name: string; login: string; password: string }, thunkAPI) => {
    try {
      return await authService.signup(user);
    } catch (error) {
      const message = (error as IError).message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login user
export const signin = createAsyncThunk(
  'auth/signin',
  async (user: { login: string; password: string }, thunkAPI) => {
    try {
      return await authService.signin(user);
    } catch (error) {
      const message = (error as IError).message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(signup.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(signin.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {});
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
