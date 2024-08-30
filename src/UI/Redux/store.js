// src/UI/Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
