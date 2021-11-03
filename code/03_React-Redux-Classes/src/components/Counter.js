import React from "react";
import { connect } from "react-redux";
import classes from "./Counter.module.css";

class Counter extends React.Component {
  incrementHandler() {
    this.props.increment();
  }
  decrementHandler() {
    this.props.decrement();
  }
  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  // receives the Redux state, and then returns an object where the keys will be available as props in the receiving component.
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // keys are prop names we use in the component
    increment: () => dispatch({ type: "INCREMENT" }),
    // value is another function in which we call dispatch and setup our action.
    decrement: () => dispatch({ type: "DECREMENT" }),
  };
};

// connect is a higher order component.
// connect wants two arguments, both being functions.
// react-redux will manage subscriptions though 'connect'
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
// We execute the connect function. It then returns a new function, and we execute this returned new function as well.
// In this returned function we pass our component (Counter).
