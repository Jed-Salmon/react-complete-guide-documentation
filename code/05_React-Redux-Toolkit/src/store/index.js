import { createSlice, configureStore } from "@reduxjs/toolkit";
// createSlice is more powerful than createReducer and simplifies some aspects in one go.

const initialState = { counter: 0, showCounter: true };

// When we have two pieces of state that aren't directly related, we can create different slices (potentially in different files), to make our code maintainable.
// The createSlice() function wants an object as argument
const counterSlice = createSlice({
  // every slice needs a 'name' property to act as identifier for that piece of state.
  name: "counter",
  initialState, // requires the initial state
  reducers: {
    // A map of all the reducers this state slice needs.
    // List reducers as methods:
    increment(state) {
      state.counter++;
      // here we CAN 'mutate' the state. Redux Toolkit and its internal package (imgur) detects code like this, clones our existing state, creates a new state object, keeps all the state which we're not editing and overrides the state.
      // Provides a better developer experience when working with Redux because we don't have to create a copy manually and keep all the code we're not changing. Instead, we just change the code we want to change and internally it's translated into immutable code.
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // when using Redux toolkit we can still have reducers that listen to actions that have an extra payload (extra data).
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
    // four methods for each if case in our previous reducer.
    // every method will automatically receive the latest state.
    // each one of the methods will be called for you by redux, depending on which action was triggered.
    // We don't need our if checks anymore, instead we identify the different reducers and dispatch actions that target these different reducer methods.
  },
});

// replaced 'createStore' with Redux Toolkit's 'configureStore'
// It creates a store but it makes merging multiple reducers into one reducer easier.
// must pass a configuration object {} to configureStore
const store = configureStore({
  // reducer key is singular because redux still expects one reducer function that is responsible for the global state.
  reducer: counterSlice.reducer, // '.reducer' property is simply a big reducer with if statements that trigger our different reducer methods depending on action type.

  // With configureStore, the value for reducer can also be an object that holds multiple reducers (see 'Redux-Toolkit-Expanded').
  // Behind the scenes configureStore merges all the reducers in the object into one big reducer.
});

export const counterActions = counterSlice.actions;
// .actions is an object full of keys where the names match the method names we made in the createSlice function.
// when our method is called on .actions, Redux Toolkit creates an 'action object' with a generated type property and a unique identifier that points to our reducer method.
// This means we don't need to worry about creating action objects and coming up with unique identifiers for them.

export default store;
