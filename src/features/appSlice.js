import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    value: 0,
  },
  reducers:{
    
  }
})

export const {} = appSlice.actions;

export const selectApp = state =>state.app.value;

export default appSlice.reducer;