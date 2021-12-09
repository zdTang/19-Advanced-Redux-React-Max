import { createSlice } from "@reduxjs/toolkit";

createSlice({
  name: "cart",
  initialState: {
    items: [], // here, each item maintain much more info then a Product
    totalQuantity: 0,
  },
  reducers: {
    // how the "action" looks like ?
    addItemToCart(state, action) {
      const newItem = action.payload; // payload is information for single product
      const existingItem = state.items.find((item) => item.id == newItem.id);
      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity = existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart() {},
  },
});
