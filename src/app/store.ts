import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tasksReducer, { type TasksState } from '../features/tasks/tasksSlice';
import authReducer, { type AuthState } from '../features/auth/authSlice';
import { loadState, saveState } from './localStorageUtils';

const preloadedState = loadState();

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = {
  auth: AuthState;
  tasks: TasksState;
};

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
