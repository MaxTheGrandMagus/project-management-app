import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from '../../services/users.service';
import { IError } from '../config';
import { UserProps } from '../../interfaces/interfaces';

interface IUserToUpdate extends UserProps {
  password: string;
}

export const getUsers = createAsyncThunk<
  Array<UserProps>,
  undefined,
  { rejectValue: string }
>(
  'users/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getUsers();
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const getUserById = createAsyncThunk<
  UserProps,
  string,
  { rejectValue: string }
>(
  'users/getUserById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await userService.getUserById(id);
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'users/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      return await userService.deleteUser(id);
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUserProfile = createAsyncThunk<
  UserProps,
  IUserToUpdate,
  { rejectValue: string }
>(
  'users/updateUserProfile',
  async (updateUserData: { id: string, name: string, login: string, password: string }, { rejectWithValue }) => {
    try {
      return await userService.updateUserProfile(updateUserData);
    } catch (error) {
      const errorMessage = (error as IError).message;
      return rejectWithValue(errorMessage);
    }
  }
);

interface UsersState {
  users: Array<UserProps>,
  userDetails: {
    id: string,
    name: string,
    login: string,
  } | null,
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  message: string | undefined,
  deleteStatusCode: string | null,
}

const initialState: UsersState = {
  users: [],
  userDetails: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: undefined,
  deleteStatusCode: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.userDetails = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = undefined;
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
      .addCase(getUsers.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userDetails = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userDetails = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteStatusCode = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;