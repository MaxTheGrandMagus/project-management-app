import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/authSlice';
import boardReducer from './boards/boardsSlice';
import userReducer from './user/userSlice';
import colReducer from './columns/colSlice';
import taskReducer from './task/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
    user: userReducer,
    columns: colReducer,
    tasks: taskReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
