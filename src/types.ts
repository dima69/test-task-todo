import type { AuthState } from './features/auth/authSlice';
import type { TasksState } from './features/tasks/tasksSlice';

export interface RootState {
  auth: AuthState;
  tasks: TasksState;
}
