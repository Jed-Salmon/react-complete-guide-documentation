import React from "react";

// takes a default context, which is usually an object
const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;
// next you must provide the context
// then consume or listen to the context
