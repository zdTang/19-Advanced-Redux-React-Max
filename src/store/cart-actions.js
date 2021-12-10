import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
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

export const fetchCartData = () => {
  return async (dispatch) => {
    // define an asynchronous function to send Http request
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-69ae2-default-rtdb.firebaseio.com/cart.json"
      );
      //
      if (!response.ok) {
        throw new Error("Fetching cart data failed.");
      }
      //
      const data = await response.json();
      return data;
    };

    // run the asynchronous function
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
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
