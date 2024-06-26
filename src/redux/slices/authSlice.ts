import { IAuth, IAuthStore } from "@/types/IAuth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id: 0,
  token: "",
  email: "",
  fullname: "",
  role: "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    onLogin: (state, action: PayloadAction<IAuthStore>) => {
      return {
        isLoggedIn: action.payload.isLoggedIn,
        id: action.payload.id,
        token: action.payload.token,
        email: action.payload.email,
        fullname: action.payload.fullname,
        role: action.payload.role,
        country: action.payload.country,
      };
    },

    onLogout: (state) => {
      return {
        isLoggedIn: false,
        id: 0,
        token: "",
        fullname: "",
        email: "",
        role: "",
      };
    },
  },
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
