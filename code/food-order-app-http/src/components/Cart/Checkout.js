import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

// validation logic (helper functions)
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    // true/valid initially so we don't show error msgs right away
    name: true,
    street: true,
    city: true,
    postCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostCode = postCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostCodeIsValid = isFiveChars(enteredPostCode);

    // Don't need functional form for this state updating function
    // (https://reactjs.org/docs/hooks-reference.html#functional-updates).
    // We overwrite the entire state object, where we assign new values to all keys.
    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postCode: enteredPostCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostCodeIsValid;

    if (!formIsValid) {
      console.log("Invalid Form");
      return;
    }
    if (formIsValid) {
      console.log("Submitted");
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postCode: enteredPostCode,
    });
  };

  const controlClasses = (formInputField) => {
    return `${classes.control} ${
      formInputsValidity[formInputField] ? "" : classes.invalid
    }`;
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={controlClasses("name")}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={controlClasses("street")}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={controlClasses("postCode")}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postCodeInputRef} />
        {!formInputsValidity.postCode && (
          <p>Please enter a valid post code (6 characters long)!</p>
        )}
      </div>
      <div className={controlClasses("city")}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
