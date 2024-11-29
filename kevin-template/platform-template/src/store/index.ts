import { configureStore } from "@reduxjs/toolkit";
import LayoutReducer from "./slice/LayoutSlice";
import BaseReducer from "./slice/BaseSlice";

const store = configureStore({
  reducer: {
    Layout: LayoutReducer,
    Base: BaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
