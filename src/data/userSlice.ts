import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  name: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  isAdmin: false,
  name: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ isAdmin: boolean; name: string }>) => {
      state.isAdmin = action.payload.isAdmin;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    removeUser: () => initialState
  }
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
