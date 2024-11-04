import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface TasksState {
  items: Array<Task>;
}

export interface Task {
  title: string;
  isDone: boolean;
  isArchived: boolean;
  id: `${string}-${string}-${string}-${string}-${string}`;
}

const initialState: TasksState = {
  items: [],
};

function findTaskById(taskId: Task['id'], tasks: Task[]) {
  const task = tasks.find((task) => task.id === taskId);
  if (!task) throw new Error(`[ERROR] taskId: ${taskId} not found`);
  return task;
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
    },
    toggleIsArchived: (state, action: PayloadAction<Task['id']>) => {
      try {
        const task = findTaskById(action.payload, state.items);
        task.isArchived = !task.isArchived;
      } catch (error) {
        console.error(error);
      }
    },
    toggleIsDone: (state, action: PayloadAction<Task['id']>) => {
      try {
        const task = findTaskById(action.payload, state.items);
        task.isDone = !task.isDone;
      } catch (error) {
        console.error(error);
      }
    },
    deleteAllTasks: (state) => {
      state.items = [];
    },
  },
});

export const { addTask, toggleIsArchived, toggleIsDone, deleteAllTasks } =
  tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.items;

export default tasksSlice.reducer;
