import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store";

const Counter = () => {
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch(counterActions.increment());
    // increment is a method which when executed creates a full action object with the type set to an automatically created unique action identifier.
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(5));
    // pass our payload data to our action method
    // Any value you pass as an argument will be automatically stored in an extra field named (by default) 'payload'.
    // e.g. {type: "unique_id", payload: "arguments value"}
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  const counter = useSelector((state) => state.counter);

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
