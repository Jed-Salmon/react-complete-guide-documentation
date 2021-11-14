import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData, fetchCartData } from "./store/cart-actions";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;
// defined outside of the component so it does not change and is not re-initialised when the component renders again.

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  // useSelector sets up a subscription to redux, so whenever our redux store changes, our App component function will be re-executed.

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // Problem with useEffect is that it executes once our app first starts.
    // This sends an empty cart to our backend and overwrite any data there.
    // To prevent this we simply return from useEffect if 'isInitial' is truthy, which it always is when our app first loads and is set to false thereafter.
    if (isInitial) {
      isInitial = false;
      return;
    }

    // dispatch only if '.changed' property is truthy (is after adding item to cart)
    if (cart.changed) {
      dispatch(sendCartData(cart));
      // Redux Toolkit doesn't just expect action objects, it also accepts action creators that return functions and will execute them for us.
    }
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

export default App;
