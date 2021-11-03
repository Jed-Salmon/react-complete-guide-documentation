import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
// .actions property is an object full of keys where the names match the method names we made in the createSlice function.
// when our method is called on .actions, Redux Toolkit creates an 'action object' with a generated type property and a unique identifier that points to our reducer method.
// This means we don't need to worry about creating action objects and coming up with unique identifiers for them.

export default authSlice.reducer;
// we only need to use the reducer so we just export that
