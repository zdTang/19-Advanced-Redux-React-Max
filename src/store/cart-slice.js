import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // here, each item maintain much more info then a Product
    totalQuantity: 0,
  },
  reducers: {
    // how the "action" looks like ?
    addItemToCart(state, action) {
      const newItem = action.payload; // payload is information for single product
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload; //  id will be passed in as payload of an action
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});
// create custom Action Creator. this is an "Thunk" !!!
// Thunk is action creator which return a function in which return a Action finally.
// Action creator will return an Action object
// While Thunk will not return an Action object directly
// It will return a function will will return an Action object
export const sendCartData = (cart) => {
  // custom action creator will return a function
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    // define an asynchronous function to send Http request
    const sendCartData = async () => {
      const response = await fetch(
        "https://react-http-69ae2-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      //
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    // call the asynchronous function we defined
    try {
      await sendCartData();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sending cart data successfully!",
        })
      );
    } catch {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed.",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
