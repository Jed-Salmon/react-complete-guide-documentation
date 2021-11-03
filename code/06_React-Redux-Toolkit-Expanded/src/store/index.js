import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import counterReducer from "./counter";

// Only call 'configureStore' once.
const store = configureStore({
  // Must have one reducer.
  reducer: {
    // With configureStore, the value for reducer can also be an object that holds multiple reducers.
    counter: counterReducer,
    auth: authReducer,
    // Behind the scenes configureStore merges all the reducers in the object into one big reducer.
    // Remember to use these identifiers ('counter' and 'auth') when access our state values with useSelector.
  },
});

export default store;
