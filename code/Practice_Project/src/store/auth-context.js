import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// Course method:
// const calculateRemainingTime = (expirationTime) => {
//   const currentTime = new Date().getTime(); // get current timestamp in ms
//   const adjustedExpirationTime = new Date(expirationTime).getTime(); // covert to date obj and get that time in ms

//   const remainingDuration = adjustedExpirationTime - currentTime;

//   // return remain time in ms (ms used in setTimeout)
//   return remainingDuration;
// };

// More readable Method:
const calculateRemainingTime = (expirationTime) => expirationTime - Date.now();
// Date.now is the number of milliseconds elapsed since January 1, 1970. Date.now plus expiration time (1 hour/3600000 ms) minus Date.now equals the remaining time.

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  // if expiration time is less than 1 minute remove token and force login
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return { token: storedToken, duration: remainingTime };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token; // !! converts a truthy or falsy value to a boolean
  // if the token string is not empty it returns true and vice versa

  const logoutHandler = useCallback(() => {
    setToken(null);
    // clear token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    console.log("token expiration time:");
    console.log(expirationTime);
    // store token in local storage
    localStorage.setItem("token", token);
    // NOTE - can only store primitive values and to store objects we must convert to JSON
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    console.log("reaming time:");
    console.log(remainingTime);

    // automatically logout once timer expires
    // points to logoutHandler as a callback, so to execute once timeout expires
    logoutTimer = setTimeout(logoutHandler, remainingTime); // returns a reference
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
