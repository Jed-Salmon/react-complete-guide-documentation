import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

let isInitial = true;
// defined outside of the component so it does not change and is not re-initialized when the component renders again.

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  // useSelector sets up a subscription to redux, so whenever our redux store changes, our App component function will be re-executed.

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );

      const response = await fetch(
        "https://advanced-redux-project-4206c-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
        // PUT stores data on firebase, however it overwrites existing data (overwrites the previous cart data).
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };

    // Problem with useEffect is that it executes once our app first starts.
    // This sends an empty cart to our backend and overwrite any data there.
    // To prevent this we simply return from useEffect if 'isInitial' is truthy, which it always is when our app first loads and is set to false thereafter.
    if (isInitial) {
      isInitial = false;
      return;
    }

    // catch any errors thrown from within the function
    sendCartData().catch((error) => {
      // dispatch error notification
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);
  // effect is re-evaluated when our redux store changes, triggering the fetch request to overwrite the cart data in firebase with our new state.

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        ></Notification>
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}
// This example contains all side effect logic within the component
// In the next lecture we try the alternative of using an Action Creator Thunk
// See file App-ACT.js for those lesson notes.
export default App;
