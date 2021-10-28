// useRef - log once when form is submitted / non focused
// useState - log and update state value on each key stroke
// state will also allow you to reset the entered input
import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);

  useEffect(() => {
    if (nameIsValid) {
      console.log("name input is valid... sending http request.");
    }
  }, [nameIsValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    // setEnteredName will be scheduled and not immediately available
    // we therefor use the event target value rather than our state value
    if (event.target.value.trim() !== "") {
      setNameIsValid(true);
    }
  };

  const nameInputBlurHandler = (event) => {
    setNameTouched(true);

    if (enteredName.trim() === "") {
      setNameIsValid(false);
    }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setNameTouched(true);

    if (enteredName.trim() === "") {
      setNameIsValid(false);
      return;
    }

    setNameIsValid(true);
    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);
    setEnteredName("");
    // alternative with refs but not ideal as we directly manipulate the DOM. React should primarily do this job.
    nameInputRef.current.value = "";
  };

  // if the input is touched and name is invalid
  const nameInputIsInvalid = !nameIsValid && nameTouched;

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler} // when input loses focus
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
