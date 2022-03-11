import React, { useState } from "react";
import "../assets/stylesheets/LoginForm.css";
import { titleCase } from "title-case";
const RegistrationForm = ({ handleTabLoginChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegistration = (event) => {
    event.preventDefault();
    console.log("Registration Button clicked");
    console.log("keys", email, password, firstName, lastName);
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
      }),
    };
    fetch("http://localhost:8000/register/", request)
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          setError("");
          setMessage(data.message);
          setEmail("");
          setFirstName("");
          setLastName("");
          setPassword("");
        } else {
          setMessage("");
          setError(data.message);
        }
      });
  };

  const handleLogin = () => {
    handleTabLoginChange(false);
  };

  return (
    <div className="form-fields">
      {message && <div className="success">{titleCase(message)}</div>}
      {error && <div className="error">{titleCase(error)}</div>}

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
