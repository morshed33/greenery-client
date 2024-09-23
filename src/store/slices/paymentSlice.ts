import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState: PaymentState = {
  status: "idle",
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    initiatePayment: (state) => {
      state.status = "loading";
      state.error = null;
    },
    paymentSuccess: (state) => {
      state.status = "success";
    },
    paymentFailed: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { initiatePayment, paymentSuccess, paymentFailed } =
  paymentSlice.actions;
export default paymentSlice.reducer;
