import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

// validation logic
const isNotEmpty = (value) => value.trim() !== "";
const isFiveChar = (value) => value.trim().length === 6;

const Checkout = (props) => {
  // name
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isNotEmpty);

  // street
  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput(isNotEmpty);

  // post code
  const {
    value: postCodeValue,
    isValid: postCodeIsValid,
    hasError: postCodeHasError,
    valueChangeHandler: postCodeChangeHandler,
    inputBlurHandler: postCodeBlurHandler,
    reset: postCodeReset,
  } = useInput(isFiveChar);

  // city
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postCodeIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      console.log("form failed to submit");
      return;
    }

    console.log("Submitted");
    console.log(nameValue, streetValue, postCodeValue, cityValue);
    nameReset();
    streetReset();
    postCodeReset();
    cityReset();
  };

  const controlClasses = (hasError) => {
    return `${classes.control} ${hasError ? classes.invalid : ""}`;
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={controlClasses(nameHasError)}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameValue}
        />
        {nameHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={controlClasses(streetHasError)}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={streetValue}
        />
        {streetHasError && <p>Please enter a valid street!</p>}
      </div>
      <div className={controlClasses(postCodeHasError)}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postCodeChangeHandler}
          onBlur={postCodeBlurHandler}
          value={postCodeValue}
        />
        {postCodeHasError && (
          <p>Please enter a valid post code (Six characters long)!</p>
        )}
      </div>
      <div className={controlClasses(cityHasError)}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={cityValue}
        />
        {cityHasError && <p>Please enter a valid city!</p>}
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
