import { IDonationActionStore } from "@/types/IDonation";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const donationActionIntialState: IDonationActionStore = {
  currentPage: 0,
  paymentChannel: "",
  amount: "",
  fullname: "",
  email: "",
  phone: "",
  country: "",
  message: "",
};

const initialState = {
  donationAction: donationActionIntialState,
};

export const donateSlice = createSlice({
  name: "donateSlice",
  initialState,
  reducers: {
    onDonationAction: (state, action: PayloadAction<IDonationActionStore>) => {
      state.donationAction = {
        ...state.donationAction,
        currentPage: action.payload.currentPage,
        paymentChannel: action.payload.paymentChannel,
        amount: action.payload.amount,
        fullname: action.payload.fullname,
        email: action.payload.email,
        phone: action.payload.phone,
        country: action.payload.country,
        message: action.payload.message,
      };
    },
  },
});

export const { onDonationAction } = donateSlice.actions;

export default donateSlice.reducer;
