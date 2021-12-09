import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";

// for configureStore, it need reducers from different Slices
// the approach is different with Redux's.
// Redux use createStore(state, action)
const store = configureStore({
  reducer: { ui: uiSlice.reducer },
});

export default store;
