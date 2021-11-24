import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // extract entered data
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // add validation (optional for this course module)

    setIsLoading(true);
    let url;
    // handle login and sign up authentication requests
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmBdGmKHyYHQMXLVe_89ATVkyXeIhhGY4";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmBdGmKHyYHQMXLVe_89ATVkyXeIhhGY4";
    }
    // send POST request to either sign up or sign in
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          // get error data from response
          return res.json().then((data) => {
            // ^^^ is an async action so must chain .then
            let errorMessage = "Authentication failed!";
            // check if there is an error property and message
            if (data && data.error && data.error.message) {
              // set errorMessage to the response data error message
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
            // we could update state and show a modal here
            // we could also parse the message and return our own custom message based on certain identifiers (i.e. "EMAIL_EXISTS" or "WEAK_PASSWORD")
          });
        }
      })
      // get response data if successful
      .then((data) => {
        console.log(data);

        /*
        // Course method (more code, less readable)
        // transforms data.expiresIn (seconds) to a date obj / time stamp format

        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
          // new date obj with the current date and time (in milliseconds) plus the time (in milliseconds as we converted with *1000) until the token expires.
        );

        authCtx.login(data.idToken, expirationTime.toISOString()); 
        // set to string as we convert it back into date obj in auth-context
        */

        // alternative transformation method (more readable):
        authCtx.login(data.idToken, Date.now() + data.expiresIn * 1000);

        // redirect
        history.replace("/");
      })
      // catch any errors (i.e the one we throw)
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
