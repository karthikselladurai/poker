import { configureStore } from '@reduxjs/toolkit';
import pokerReducer from './reducers/pokerReducer';

export const store = configureStore({
  reducer: {
    poker:pokerReducer
  },
})