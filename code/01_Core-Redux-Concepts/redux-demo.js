// Redux is not restricted to react. You can use it in any JavaScript project (and some other programming languages).
const redux = require("redux");

// pass state a default value for the reducers initial run
const counterReducer = (state = { counter: 0 }, action) => {
  // return the new state (replaces existing state)
  if (action.type === "INCREMENT") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "DECREMENT") {
    return {
      counter: state.counter - 1,
    };
  }
  // default action (initial load)
  return state;
};
/*
- Reducer function produces new state snapshots whenever an action reaches it.

- When we run our code for the first time, the reducer will also be executed with a default action that will output our initial state.

- Reducer is a standard JavaScript function but it will be called by the Redux library.

- It always receives two inputs/parameters, the old state plus the dispatched action.

- The reducer function must always return a new state object (or any data type, but typically an object).

- A reducer function should be a pure function. Meaning the same values for the inputs should always produce/lead to the same output with no side effects - i.e. sending https request, writing to local storage or fetching from local storage.
*/

// store - holds all our data (state)
// createStore is a method exposed by the redux library
const store = redux.createStore(counterReducer);
// store needs to know which reducer is responsible for change

// subscribes to store and is triggered when state changes
// to trigger state change we must dispatch an action.
const counterSubscriber = () => {
  // does not take any parameters
  const latestState = store.getState();
  // getState is a method which is available on createStore.
  // Gives us the latest state snapshot after it was updated
  console.log(latestState);
};

store.subscribe(counterSubscriber);
// tells the store that counterSubscriber function should be executed when our state changes

// create and dispatch an action
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
