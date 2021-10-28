import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

// 'ref' is a second argument that can be accepted (not used often).
// To enable ref, we need to export our component function by wrapping it with the 'ForwardRef' function.
const Input = React.forwardRef((props, ref) => {
  // Once applied 'Input' remains a react component that is capable of being bound to a ref. However the only thing you will be able to control/use is what you explicitly exposed within 'useImperativeHandle'.
  const inputRef = useRef();
  console.log("LOGGING INPUT REF");
  console.log(inputRef);

  const focus = () => {
    inputRef.current.focus();
  };

  // useImperativeHandle is a hook which allows us to use this component or its functionality imperatively. I.e not through regular state props management. We instead directly call or manipulate something in the component programmatically.

  useImperativeHandle(ref, () => {
    // second argument is a function that should return an object
    // A translation object between internal functionality and the parent component
    return {
      focus,
      // this object contains all the data you will be able to use from outside.
      // not only limited to functions. You could instead choose to expose a value.
    };
  });

  // With the useImperativeHandle and forwardRef, you can expose functionalities from a React Component to its parent Component to then use your Component in the parent Component through refs and trigger certain functionalities.

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.type}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
