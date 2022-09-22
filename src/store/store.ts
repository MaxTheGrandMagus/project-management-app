import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/auth.slice';
import usersReducer from './users/users.slice';
import boardsReducer from './boards/boards.slice';
import columnsReducer from './columns/columns.slice';
import tasksReducer from './tasks/tasks.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
