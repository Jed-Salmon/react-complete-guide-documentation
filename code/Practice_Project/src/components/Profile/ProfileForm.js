import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInput = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInput.current.value;

    // add validation (optional for course module)

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmBdGmKHyYHQMXLVe_89ATVkyXeIhhGY4",
      {
        method: "POST",
        body: JSON.stringify({
          // here we add the token in the body
          idToken: authCtx.token,
          // for other API's or endpoints we may have to add our token as a query parameter or in the headers.
          // if you are creating an API you can decide where to expect that token.
          // with a third party API you have to check the api documentation.
          password: enteredNewPassword,
          returnSecureToken: false, // true if we want a new token in response
        }),
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer [token]" -- example
        },
      }
    )
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Password Reset Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        history.replace("/");
      })
      .catch((err) => alert(err));
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordInput}
          minLength="6" // shouldn't just rely on this form of validation (can be disabled with dev tools)
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
