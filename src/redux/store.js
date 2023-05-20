import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import apiReducer from './reducers/apiSlice';
import pokerReducer from './reducers/pokerReducer';
import authReducer from './reducers/authReducer'
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import navReducer from './reducers/navReducer';
import {
  persistStore,
  persistReducer,
} from 'redux-persist'

const rootPersistConfig = {
  key: 'root',
  storage,
}
const authPersistConfig = {
  key: 'auth',
  storage: storage,
  // whitelist: ['isAuth'],
};

const rootReducer = combineReducers({
  auth:persistReducer(authPersistConfig, authReducer),
  poker: pokerReducer,
  api: apiReducer,
  nav:navReducer
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
  middleware: [thunk]
});
export const persistor = persistStore(store);
