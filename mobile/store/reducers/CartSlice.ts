import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CryptoCurrencyDB } from "../../types/crypto";

export interface CartItem extends CryptoCurrencyDB {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCrypto: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<CryptoCurrencyDB>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },

    removeItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          existingItem.quantity = 0;
        } else {
          existingItem.quantity -= 1;
        }

        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
      }
    },

    clearCart: () => initialState,
  },
});

export const { addItem, removeItem, clearCart, setCrypto } = cartSlice.actions;
export default cartSlice.reducer;
