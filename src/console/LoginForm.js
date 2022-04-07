import React, { useState } from "react";
import { Link } from "react-router-dom";
import { titleCase } from "title-case";
const LoginForm = ({ handleTabChange, handleModalLoginClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  // const handleChange = (event) => {
  //   setEmail(event.target.value);
  //   setPassword(event.target.value);
  // };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login Button clicked");
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch("http://localhost:8000/login/", request)
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          console.log("Success", data);
          setError("");
          setUserId(data.id);
          setMessage(data.message);
          setEmail("");
          setPassword("");
          localStorage.setItem("jwt-token", data.jwt);
          localStorage.setItem("id", data.token_id);
          localStorage.setItem("user", data.user_id);
          setIsLoggedIn(true);
          handleModalLoginClose(false);
        } else {
          console.log("Error");
          setMessage("");
          setError(data.message);
        }
      });
  };

  const handleSignUp = () => {
    handleTabChange(true);
  };

  return (
    <form className="form-fields" onSubmit={handleLogin}>
      {/* {message && <div className="success">{titleCase(message)}</div>} */}
      {error && <div className="error">{titleCase(error)}</div>}
      <div className="form-field">
        <label htmlFor="email" id="email" className="label">
          Email
        </label>
        <input
          type="email"
          className="text-input"
          id="email"
          name="email"
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
          name="password"
          className="text-input"
          id="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button name="button" id="button" className="button-1">
        LOGIN
      </button>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <a to="#" className="forgot-password">
          Forgot password ?
        </a>
      </div>
      <p className="footer">
        Not a member?{" "}
        <button onClick={handleSignUp} className="sign-up-now">
          Sign up now!
        </button>
      </p>
    </form>
  );
};
export default LoginForm;
