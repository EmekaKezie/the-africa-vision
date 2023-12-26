import { IAuth, IAuthStore } from "@/types/IAuth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
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
        id: action.payload.id,
        token: action.payload.token,
        email: action.payload.email,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        roleId: action.payload.roleId,
        roleName: action.payload.roleName,
      };
    },
  },
});

export const { onLogin } = authSlice.actions;

export default authSlice.reducer;
