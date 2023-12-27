import { IAuth, IAuthStore } from "@/types/IAuth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id: "",
  token: "",
  email: "",
  firstname: "",
  lastname: "",
  roleId: "",
  roleName: "",
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
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        roleId: action.payload.roleId,
        roleName: action.payload.roleName,
      };
    },

    onLogout: (state) => {
      return {
        isLoggedIn: false,
        id: "",
        token: "",
        firstname: "",
        lastname: "",
        email: "",
        roleId: "",
        roleName: "",
      };
    },
  },
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
