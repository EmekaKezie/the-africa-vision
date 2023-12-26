import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import _testSlice from "./slices/_testSlice";
import donateSlice from "./slices/donateSlice";
import authSlice from "./slices/authSlice";

const persistConfig = {
  key: "root",
  storage,
  whiteLists: [],
  blacklist: ["testReducer", "donateSlice", "authSlice"],
};

const reducers = combineReducers({
  testReducer: _testSlice,
  donateReducer: donateSlice,
  authReducer: authSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
