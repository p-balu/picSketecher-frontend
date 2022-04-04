import React, { useState } from "react";
import "../assets/stylesheets/LoginRegistrationModal.css";

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="account-update">
      <form className="form-update">
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
        >
          UPDATE
        </button>{" "}
      </form>

      <form className="form-update">
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
        >
          CHANGE PASSWORD
        </button>{" "}
      </form>
    </div>
  );
};
export default Account;
