import React, { useState, useEffect } from "react";
import "../assets/stylesheets/LoginRegistrationModal.css";
import { titleCase } from "title-case";
const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handlePasswordChange = (event) => {
    event.preventDefault();
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("user"),
        currentpassword: currentPassword,
        updatedpassword: newPassword,
      }),
    };
    fetch("http://localhost:8000/updatepassword/", request)
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          setSuccess("");
          setError(data.message);
        } else {
          setError("");
          setSuccess(data.message);
        }
      });
  };

  useEffect(() => {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("user"),
      }),
    };
    fetch("http://localhost:8000/getuser/", request)
      .then((res) => res.json())
      .then((data) => {
        setFirstName(data["First Name"]);
        setLastName(data["Last Name"]);
      });
  }, [localStorage.getItem("user")]);

  const handleUserDetailsChange = (event) => {
    event.preventDefault();
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("user"),
        updatedfirstname: firstName,
        updatedlastname: lastName,
      }),
    };
    fetch("http://localhost:8000/updateuser/", request)
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          setError("");
          console.log("entered");
          setSuccess(data.message);
        } else {
          setSuccess("");
          console.log("entered");
          setError(data.message);
        }
      });
  };

  return (
    <div className="account-update">
      <form className="form-update">
        {success && <div className="success">{titleCase(success)}</div>}
        {error && <div className="error">{titleCase(error)}</div>}
        <p
          className="button1 active"
          style={{ width: "30%", textAlign: "center" }}
        >
          User Info
        </p>
        <div className="form-field">
          <label htmlFor="firstname" id="firstname" className="label">
            First Name
          </label>
          <input
            type="text"
            className="text-input"
            id="firstname"
            name="firstname"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="lastname" id="lastname" className="label">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            className="text-input"
            id="lastname"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>
        <button
          name="button"
          id="button"
          className="button-1"
          style={{ marginBottom: "4%" }}
          onClick={handleUserDetailsChange}
        >
          UPDATE
        </button>{" "}
      </form>

      <form className="form-update">
        {success && <div className="success">{titleCase(success)}</div>}
        {error && <div className="error">{titleCase(error)}</div>}
        <p
          className="button1 active"
          style={{ width: "30%", textAlign: "center" }}
        >
          Password{" "}
        </p>
        <div className="form-field">
          <label
            htmlFor="currentpassword"
            id="currentpassword"
            className="label"
          >
            Current Password{" "}
          </label>
          <input
            type="password"
            className="text-input"
            id="currentpassword"
            name="currentpassword"
            value={currentPassword}
            onChange={(event) => {
              setCurrentPassword(event.target.value);
            }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="newpassword" id="newpassword" className="label">
            New Password{" "}
          </label>
          <input
            type="password"
            name="newpassword"
            className="text-input"
            id="newpassword"
            value={newPassword}
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />
        </div>
        <button
          name="button"
          id="button"
          className="button-1"
          style={{ marginBottom: "4%" }}
          onClick={handlePasswordChange}
        >
          CHANGE PASSWORD
        </button>{" "}
      </form>
    </div>
  );
};
export default Account;
