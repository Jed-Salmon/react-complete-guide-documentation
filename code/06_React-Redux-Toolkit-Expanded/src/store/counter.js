import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;
// .actions property is an object full of keys where the names match the method names we made in the createSlice function.
// when our method is called on .actions, Redux Toolkit creates an 'action object' with a generated type property and a unique identifier that points to our reducer method.
// This means we don't need to worry about creating action objects and coming up with unique identifiers for them.

export default counterSlice.reducer;
// we only need the reducer so we just export that
