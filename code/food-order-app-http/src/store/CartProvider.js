import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Reducer stays outside the component function, as it requires no data from it.
// It also shouldn't be recreated each time the component is re-evaluated.
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // Checks if the item already exists within the cart:
    const existingCartItemIndex = state.items.findIndex(
      // built in method which finds the index of an item within array.
      // Param takes a function which should return true if the condition is met.
      (item) => item.id === action.item.id
    ); // returns the index if the item exists

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    // if item exists then update the amount value & create a new items array.
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      // spread creates a new array and is non mutable.
      updatedItems[existingCartItemIndex] = updatedItem;
      // for existing cart item, we overwrite it with the updated item.
    } else {
      //  item is added for the first time to the array
      updatedItems = state.items.concat(action.item);
      // concat generates a new array without editing the old array in memory,
      // otherwise we would overwrite the state reference without react knowing.
    }

    // must return new state snapshot
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    // find existing cart item:
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    // removes existing item amount from total amount (always the case).
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      // if last item of type, remove the entire item from the array.
      updatedItems = state.items.filter((item) => item.id !== action.id);
      // returns a new array, filtered by the condition.
      // if item id matches (false) then it is removed.
    } else {
      // if item is greater than 1, decrease the existing amount.
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      // overrides the old item in the array
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
