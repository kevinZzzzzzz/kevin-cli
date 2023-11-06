import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const xxxSlice = createSlice({
  name: 'xxx',
  initialState: {
    xxx: ''
  },
  reducers: {
    xxx(state: any, {payload}) {
      state.xxx = payload.xxx
    }
  }
})

export const {xxx} = xxxSlice.actions
export default xxxSlice.reducer