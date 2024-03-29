import React from "react";
import { useRef, useContext, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import styles from "./AuthForm.module.css";
import useInput from "../../hooks/use-input";
import AuthContext from "../../Store/auth-context";
import {
  createUser,
  writeToken,
  writeUserId,
} from "../../Services/Auth.service";

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    value: enteredemail,
    isValid: enteredemailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
    isTouched: emailIsTouched,
  } = useInput((value) => value.includes("@"));
  const {
    value: enteredpassword,
    isValid: enteredpasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
    isTouched: passwordIsTouched,
  } = useInput((value) => value.trim() !== "");
  const [searchParams] = useSearchParams();
  const isLogin =
    !searchParams.get("mode") || searchParams.get("mode") === "login";
  let formIsValid = false;
  if (enteredemailIsValid && enteredpasswordIsValid) {
    formIsValid = true;
  }
  const authenticateUser = async (email, password, isLogin) => {
    const authEndpoint = isLogin ? "signInWithPassword" : "signUp";
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:${authEndpoint}?key=AIzaSyDDterKQwdXqaIVJREc4Cfo3_HHV6yezkk`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error.message;
      if (errorMessage === "EMAIL_EXISTS") {
        setError("This email already exists!");
      } else if (errorMessage === "INVALID_PASSWORD") {
        setError("Invalid password!");
      } else if (errorMessage === "EMAIL_NOT_FOUND") {
        setError("Email not found!");
      } else {
        setError("Authentication failed!");
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    authCtx.login(
      data.idToken,
      data.email,
      data.localId,
      data.email.split("@")[0]
    );
    if (!isLogin) {
      const user = {
        email: data.email,
        username: data.email.split("@")[0], // Extract username from email
        userId: data.localId,
      };
      createUser(user);
    }
    writeToken(data.idToken);
    writeUserId(data.localId);
    navigate("/");
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    authenticateUser(email, password, isLogin);
    resetEmailInput();
    resetPasswordInput();
    // setSearchParams({ mode: "login" });
  };
  const emailInputClasses = emailInputHasError
    ? `${styles.input} ${styles.invalid}`
    : styles.input;
  const passwordInputClasses = passwordInputHasError
    ? `${styles.input} ${styles.invalid}`
    : styles.input;
  const buttonClasses = formIsValid
    ? styles.button
    : `${styles.button} ${styles.button_disabled}`;

  return (
    // set image as background

    <div className={styles.auth}>
      <div className={styles.auth_container}>
        <h2 className={styles.title}>
          {isLogin ? "Sign in" : "Create new account"}
        </h2>
        <form onSubmit={SubmitHandler}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            className={emailInputClasses}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            type="text"
            required
            value={enteredemail}
            ref={emailInputRef}
          />
          {emailInputHasError && (
            <p className={styles.error_text}>Email must not be empty</p>
          )}
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            className={passwordInputClasses}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            type="password"
            required
            value={enteredpassword}
            ref={passwordInputRef}
          />
          {passwordInputHasError && (
            <p className={styles.error_text}>Password must not be empty</p>
          )}
          <Button
            disabled={!formIsValid}
            type="submit"
            className={buttonClasses}
            name={isLogin ? "Sign in" : "Sign up"}
          >
            {isLogin ? "Sign in" : "Sign up"}
          </Button>
          {(emailIsTouched && enteredemailIsValid) ||
            (error && <p className={styles.error_text}>{error}</p>)}

          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </Link>
        </form>
      </div>
    </div>
  );
};
export default AuthForm;
