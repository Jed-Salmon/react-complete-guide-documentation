import React from "react";
import classes from "./Input.module.css";

// Our custom Input component is an argument for 'forwardRef'
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* forward ref to our input */}
      <input ref={ref} {...props.input} />
      {/* spread operator ensures all key value pairs within props.input are applied/added as props to the element. */}
    </div>
  );
});

export default Input;
