import { UserProps } from '../../interfaces/interfaces';
import { createSlice, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import userService from './users.service';

interface IError {
  message?: string;
  response: {
    data: {
      message?: string;
    };
  };
}

const initialState: {
  users: Array<UserProps>,
  userDetails: {
    name: string,
    login: string,
    password: string,
  },
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  message: string,
  deleteStatusCode: null | number,
} = {
  users: [],
  userDetails: {
    name: '',
    login: '',
    password: ''
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  deleteStatusCode: null,
};

//Get all users
export const getUsers = createAsyncThunk<Array<UserProps>>(
  'user/getUsers',
  async (_, thunkAPI) => {
    try {
      return await userService.getUsers();
    } catch (error) {
      const errorMassage = (error as IError).message;
      return thunkAPI.rejectWithValue(errorMassage);
    }
  }
);

//Get user by ID
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id: string, thunkAPI) => {
    try {
      return await userService.getUserById(id);
    } catch (error) {
      const errorMassage = (error as IError).message;
      return thunkAPI.rejectWithValue(errorMassage);
    }
  }
);

// Update user profile by id
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (updateUserData: { id: string, name: string, login: string, password: string }, thunkAPI) => {
    try {
      return await userService.updateUserProfile(updateUserData);
    } catch (error) {
      const errorMassage = (error as IError).message;
      return thunkAPI.rejectWithValue(errorMassage);
    }
  }
);

// Delete by id
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string, thunkAPI) => {
    try {
      return await userService.deleteUser(id);
    } catch (error) {
      const errorMassage = (error as IError).message;
      return thunkAPI.rejectWithValue(errorMassage);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.userDetails = {
        name: '',
        login: '',
        password: ''
      };
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.deleteStatusCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state, action: AnyAction) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userDetails = action.payload;
      })
      .addCase(getUserById.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userDetails = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteStatusCode = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;