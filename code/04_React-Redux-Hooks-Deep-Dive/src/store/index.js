import { createStore } from "redux";

const initialState = {
  counter: 0,
  showCounter: true,
};

// ensures we have unique identifiers and don't mistype
export const INCREMENT = "increment";

const counterReducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    // state.counter++
    // ^^^^^WRONG^^^^^
    // Never mutate the state, always return a new state object
    // Returned object/value will overwrite any existing state
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
      // Requires showCounter property even if we don't do anything with it.
      // Must always set all other states when add to our initial state because we overwrite the old state.
    };
  }
  if (action.type === "increase") {
    return {
      ...state,
      // We don't have to manually add all state properties, we can use the spread operator and change just the property needed.
      counter: state.counter + action.amount,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }
  if (action.type === "toggle") {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
    };
  }
  return state;
};

const store = createStore(counterReducer);

// We don't want to subscribe and dispatch here.
// Instead we connect our app to the redux store.
// Our App components will dispatch and listen.

export default store;
// export store so we can provide it to the whole app (index.js)
