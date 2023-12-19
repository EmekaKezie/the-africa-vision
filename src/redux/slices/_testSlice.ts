import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const _testSlice = createSlice({
  name: "testSlice",
  initialState,
  reducers: {
    onIncrement: (state) => {
      state.count = state.count + 1;
    },
    onDecrement: (state) => {
      state.count = state.count + -1;
    },
    onClear: (state) => {
      state.count = 0;
    },
  },
});

export const {onIncrement, onDecrement, onClear} = _testSlice.actions
export default _testSlice.reducer
