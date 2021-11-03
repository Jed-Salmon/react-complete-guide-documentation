import { createStore } from "redux";

const initialState = {
  counter: 0,
};

const counterReducer = (state = initialState, action) => {
  if (action.type === "INCREMENT") {
    return { counter: state.counter + 1 };
  }
  if (action.type === "DECREMENT") {
    return { counter: state.counter - 1 };
  }
  return state;
};

const store = createStore(counterReducer);

// We don't want to subscribe and dispatch here.
// Instead we connect our app to the redux store.
// Our App components will dispatch and listen.

export default store;
// export store so we can provide it to the whole app (index.js)
