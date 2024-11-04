import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  username: string | null;
  password: string | null;
}

const initialState: AuthState = {
  username: '',
  password: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      const { username, password } = action.payload;

      if (username === 'admin' && password === 'admin') {
        state.username = username;
        state.password = password;
      }
    },
    logout: (state) => {
      state.username = null;
      state.password = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
