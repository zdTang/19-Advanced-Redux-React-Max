import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible; // looks like it is mutating state (Not really)
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

/*============================================
createSlice looked at all of the functions that were defined in the reducers field, 
and for every "case reducer" function provided, 
generates an *action creator* that uses the name of the reducer as the action type itself.
So, the createPost reducer became an action type of "posts/createPost", 
and the createPost() action creator will return an action with that type.
===============================================*/
export const uiActions = uiSlice.actions;
export default uiSlice;
