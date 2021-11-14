import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://advanced-redux-project-4206c-default-rtdb.firebaseio.com/cart.json"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          // condition in case if we remove all items
          items: cartData.items || [],
          // if so set items property to empty array
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

// must be outside the slice
export const sendCartData = (cart) => {
  // immediately returns another function
  return async (dispatch) => {
    // should provide the dispatch function as an argument which is automatically passed to us by Redux Toolkit (when dispatching sendCartData in App.js)
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    // We can perform any asynchronous code or side effects because this does not reach our reducer as its a standalone function.
    const sendRequest = async () => {
      const response = await fetch(
        "https://advanced-redux-project-4206c-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
        // PUT stores data on firebase, however it overwrites existing data (overwrites the previous cart data).
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      // can await as the outer function is async
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      // handle errors
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
