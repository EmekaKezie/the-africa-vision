import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type props = {
  isValid: boolean;
};

const initialState = {
  isValid: true,
};

export const sessionSlice = createSlice({
  name: "sessionSlice",
  initialState,
  reducers: {
    onSessionValid: (state, action: PayloadAction<props>) => {
      return {
        isValid: action.payload.isValid,
      };
    },
  },
});

export const { onSessionValid } = sessionSlice.actions;
export default sessionSlice.reducer;
