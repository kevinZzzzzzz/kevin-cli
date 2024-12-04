import { configureStore } from "@reduxjs/toolkit";
import LayoutReducer from "./slice/LayoutSlice";
import BaseReducer from "./slice/BaseSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["Layout", "Base"],
};
const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Base: BaseReducer,
});
// 可持久化
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);
export default store;
