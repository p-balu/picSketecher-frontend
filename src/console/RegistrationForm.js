import React, { useState } from "react";
import "../assets/stylesheets/LoginForm.css";
const RegistrationForm = ({ handleTabLoginChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
        <label htmlFor="firstName" id="firstName" className="label">
          First Name
        </label>{" "}
        <input
          type="text"
          className="text-input"
          id="firstName"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
      </div>
      <div className="form-field">
        <label htmlFor="lastName" id="lastName" className="label">
          Last Name
        </label>{" "}
        <input
          type="text"
          className="text-input"
          id="lastName"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
      </div>
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
