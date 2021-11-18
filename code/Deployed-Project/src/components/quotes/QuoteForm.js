import { useRef, useState } from "react";
import { Prompt } from "react-router-dom"; // Automatically watches if we navigate away. If a certain condition is met, it shows a warning before allowing us to leave.
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const [isEntering, setIsEntering] = useState(false);
  // show a warning if the user tries to leave after working on the form
  // determine when user starts working on the form (onFocus)
  const formFocusedHandler = () => {
    console.log("focused");
    setIsEntering(true);
  };

  // prevents button/form submission from prompting the dialog box
  const finishedEnteringHandler = () => {
    setIsEntering(false);
  };

  return (
    <>
      {/* Prompt requires two props: 'when' takes in true or false defining whether the prompt should be shown if the user changes the url or not. */}
      {/* 'message' takes a function which should return a string with the text we want to show the user when they try to leave the page. */}
      {/* 'message' takes a function because we get a location object, which holds information about the page we're trying to go to. */}
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? All your entered data will be lost!"
        }
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishedEnteringHandler} className="btn">
              Add Quote
            </button>
            {/* 'programmatic navigation' - trigger a navigation action programmatically, i.e. after data successfully sends to server. See NewQuote.js 'addQuoteHandler' */}
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
