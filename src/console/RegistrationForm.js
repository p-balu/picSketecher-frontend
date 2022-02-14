import React, { useState } from "react";
import "../assets/stylesheets/LoginForm.css";
const RegistrationForm = ({ handleTabLoginChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegistration = (event) => {
    event.preventDefault();
    console.log("Registration Button clicked");
  };

  const handleLogin = () => {
    handleTabLoginChange(false);
  };

  return (
    <div className="form-fields">
      <div className="form-field">
        <label htmlFor="email" id="email" className="label">
          Email
        </label>{" "}
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
        <label htmlFor="username" id="username" className="label">
          Username
        </label>{" "}
        <input
          type="text"
          className="text-input"
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div className="form-field">
        <label htmlFor="password" id="password" className="label">
          Password
        </label>{" "}
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
      <button className="button-1" onClick={handleRegistration}>
        SIGN UP
      </button>
      <p className="footer">
        Already have account?{" "}
        <button onClick={handleLogin} className="sign-up-now">
          Log In
        </button>
      </p>
    </div>
  );
};
export default RegistrationForm;
