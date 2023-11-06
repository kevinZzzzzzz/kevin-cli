import { configureStore } from "@reduxjs/toolkit";
import xxxReducer from "./slice";

const store = configureStore({
  reducer: {
    xxx: xxxReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store