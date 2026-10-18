import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "../types/transaction";

interface TransactionState {
  transactionToEdit: Transaction | null;
}

const initialState: TransactionState = {
  transactionToEdit: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionToEdit(state, action: PayloadAction<Transaction>) {
      state.transactionToEdit = action.payload;
    },
    clearTransactionToEdit(state) {
      state.transactionToEdit = null;
    },
  },
});

export const { setTransactionToEdit, clearTransactionToEdit } =
  transactionSlice.actions;

export default transactionSlice.reducer;