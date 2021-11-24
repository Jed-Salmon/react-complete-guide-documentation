// converted to try catch for learning purposes

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

  const submitHandler = async (event) => {
    event.preventDefault();

    // extract entered data
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // add validation (optional for this course module)

    // handle login and sign up authentication requests
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmBdGmKHyYHQMXLVe_89ATVkyXeIhhGY4";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmBdGmKHyYHQMXLVe_89ATVkyXeIhhGY4";
    }
    // send POST request to either sign up or sign in
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (data) {
        setIsLoading(false);
      }

      if (response.ok) {
        console.log("Authentication successful, user has logged in.");
      } else {
        let errorMessage = "Authentication failed!";
        // check if there is an error property and message
        if (data && data.error && data.error.message) {
          // set errorMessage to the response data error message
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      authCtx.login(data.idToken, Date.now() + data.expiresIn * 1000);

      // redirect
      history.replace("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
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
