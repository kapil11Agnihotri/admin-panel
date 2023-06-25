import React, { useRef, useState, useContext } from "react";
import classes from "./LoginPage.module.css";
import { AuthContext } from "../../Store/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const location = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authContext = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const obj = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDK0m7S4_oNvHj1xthBH3wpSBGcbrAOgfA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDK0m7S4_oNvHj1xthBH3wpSBGcbrAOgfA";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Authentication failed!");
      }

      const data = await response.json();
      authContext.login(data.idToken);
      authContext.emailHandler(enteredEmail);
      location("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Consumer>
      {(authContext) => (
        <section className={classes.auth}>
          <h1>{isLogin ? "Login" : "SignUp"}</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="email">Enter Email</label>
              <input type="email" required ref={emailInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Enter Password</label>
              <input type="password" required ref={passwordInputRef} />
            </div>
            <div className={classes.actions}>
              <button>{isLogin ? "Login" : "Create Account"}</button>
            </div>
            <div className={classes.actions}>
              <button
                onClick={() => {
                  setIsLogin((pre) => !pre);
                }}
                className={classes.toggle}
              >
                {isLogin
                  ? "New User? Create new account"
                  : "Existing User? Login with existing account"}
              </button>
            </div>
          </form>
        </section>
      )}
    </AuthContext.Consumer>
  );
};

export default LoginPage;
