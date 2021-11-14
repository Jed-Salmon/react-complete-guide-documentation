const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      // check if already part of the array
      const existingItem = state.items.find((item) => item.id === newItem.id);
      // if item does not exist then add new item obj to the items array.
      state.totalQuantity++;
      // no matter if we have an existing item or not, increase quantity by 1
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        }); // push mutates the existing array in state.
        // However redux toolkit internally insures an immutable state update.
      } else {
        // if item exists then increase the quantity.
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        // if item quantity is equal to one then remove from items array
        state.items = state.items.filter((item) => item.id !== id);
        // keeps all items where id does not match.
        // overrides items with a new array, whereby the filtered item is removed.
      } else {
        // if item quantity is greater than one then reduce by 1.
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      // We keep our data transformation logic inside the reducer (fat reducer)
      // We do not perform side effects inside the reducer!
      // After redux updates its store, we can then send the request to the server inside a component using useEffect (see App.js).
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
