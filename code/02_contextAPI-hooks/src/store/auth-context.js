import React, { useState, useEffect } from "react";

// takes a default context, which is usually an object
const AuthContext = React.createContext({
  isLoggedIn: false,
  // good idea to add your functions to the default context
  onLogout: () => {},
  // This gives better IDE auto-completion within VS Code.
  onLogin: (email, password) => {},
});

// Isolated our logic by creating a component which focuses on authentication alone
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should check email and password
    // But it's just a dummy demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
// next you must provide the context
// then consume or listen to the context
