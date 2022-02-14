import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/stylesheets/LoginForm.css";

const LoginForm = ({ handleTabChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login Button clicked");
  };

  const handleSignUp = () => {
    handleTabChange(true);
  };

  return (
    <div className="form-fields">
      <div className="form-field">
        <label htmlFor="email" id="email" className="label">
          Email
        </label>
        <input
          type="email"
          className="text-input"
          id="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="form-field">
        <label htmlFor="password" id="password" className="label">
          Password
        </label>
        <input
          type="password"
          className="text-input"
          id="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button className="button-1" onClick={handleLogin}>
        LOGIN
      </button>
      <a to="#" className="forgot-password">
        Forgot password ?
      </a>
      <p className="footer">
        Not a member?{" "}
        <button onClick={handleSignUp} className="sign-up-now">
          Sign up now!
        </button>
      </p>
    </div>
  );
};
export default LoginForm;
