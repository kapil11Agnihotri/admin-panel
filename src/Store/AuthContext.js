import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  emailHandler: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(userEmail);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  }, [email]);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const emailHandler = (email) => {
    setEmail(email);
  };

  const logoutHandler = () => {
    setToken("");
    setEmail("");
  };

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    emailHandler: emailHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
