// useSelector is a custom hook provided by react-redux.
// useStore hook could also give us direct access to the store.
// if we had a class based component then we could use 'connect'.
// 'connect' acts a wrapper around our class component, to connect it to the store.
import { useSelector, useDispatch } from "react-redux";
// useSelector automatically allows us to select a specific part of our state managed by the store.

import classes from "./Counter.module.css";
import { INCREMENT } from "../store";

const Counter = () => {
  const dispatch = useDispatch(); // we don't pass an arguments
  // 'useDispatch' gives us back a dispatch function which we can execute.

  const incrementHandler = () => {
    dispatch({ type: INCREMENT });
    // 'dispatch' is a function we can call to dispatch an action against our store.
  };
  const increaseHandler = () => {
    dispatch({ type: "increase", amount: 5 });
    // Typically we want to dispatch actions that carry a payload.
    // The payload carries extra value/s or data that are passed to and used in the reducer function.
  };
  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };
  const toggleCounterHandler = () => {
    dispatch({ type: "toggle" });
  };

  const counter = useSelector((state) => state.counter);
  // Must pass a function to useSelector.
  // Its used to determine which piece of data will be extracted from the store.
  // The function will be executed for us by the react-redux package.
  // On execution it passes the redux state to the function and retrieves the specified part of the state you need in the component (state.counter).

  // With useSelector, react-redux sets up a subscription to the redux store for this component. The component will be updated and receive the latest state snapshot automatically whenever the data in the redux store changes.
  // If the component were to unmount (removed from the DOM), react-redux would also automatically clear the subscription for you.
  // Simply put, react-redux manages subscriptions for you, behind the scenes.

  const showCounter = useSelector((state) => state.showCounter);

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
