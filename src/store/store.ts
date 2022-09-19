import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/auth.slice';
import userReducer from './users/users.slice';
import boardReducer from './boards/boards.slice';
import colReducer from './columns/columns.slice';
import taskReducer from './tasks/tasks.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    boards: boardReducer,
    columns: colReducer,
    tasks: taskReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
