// features/cart/cartSlice.ts
import { RootState } from "../store"; // Adjust based on your actual store setup
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TCartItem {
  id: string;
  title: string;
  price: number;
  quantity: number; // The total quantity available in stock
  image: string;
  addedQuantity: number; // The quantity the user has added to the cart
}

interface CartState {
  items: TCartItem[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        const newAddedQuantity =
          existingItem.addedQuantity + action.payload.addedQuantity;
        if (newAddedQuantity <= existingItem.quantity) {
          existingItem.addedQuantity = newAddedQuantity;
        }
      } else {
        state.items.push({
          ...action.payload,
          addedQuantity: action.payload.addedQuantity,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.addedQuantity < item.quantity) {
        item.addedQuantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.addedQuantity > 1) {
        item.addedQuantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

// Selector to reformat cart items for order submission
export const selectCartItemsForOrder = (state: RootState) => {
  return state.cart.items.map((item) => ({
    title: item.title,
    productId: item.id,
    price: item.price,
    quantity: item.addedQuantity,
  }));
};

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
