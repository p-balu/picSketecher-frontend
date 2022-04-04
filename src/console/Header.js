import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import "../assets/stylesheets/Header.css";
import AccountLogin from "../assets/svg/AccountLogo";
import Modal from "../components/Modal";
import Login from "./Login";
import jwt_decode from "jwt-decode";
import { titleCase } from "title-case";

const Header = () => {
  const ref = useRef(null);

  const [show, setShow] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const navigate = useNavigate();
  //event handlers
  const handleLogin = (event) => {
    event.preventDefault();
    setShow(true);
  };
  const handleStart = (event) => {
    event.preventDefault();
    navigate("/image-conversion");
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleConvert = (event) => {
    event.preventDefault();
    navigate("/image-conversion");
  };

  const handleLogout = (event) => {
    event.preventDefault();
    let id = localStorage.getItem("id");
    console.log(typeof id);
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        id: id,
      }),
    };
    fetch("http://localhost:8000/logout/", request)
      .then((res) => res.json())
      .then((res) => {
        if (res.success == true) {
          localStorage.removeItem("jwt-token");
          navigate("/");
        }
      });
  };

  // useEffect(() => {
  //   console.log("Use Effect");
  //   const token = localStorage.getItem("jwt-token");
  //   //JWT check if token expired
  //   if (token) {
  //     console.log("token expiry check");
  //     const decodedToken = jwt_decode(token);
  //     const dateTime = new Date().getTime();
  //     if (decodedToken.exp * 1000 < dateTime) {
  //       handleLogout();
  //     }
  //   }
  // }, [location]);

  const handleDropDown = () => {
    console.log("dropDownClicked");
    setDropDown(true);
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleModalClose = (value) => {
    setShow(value);
  };

  //to detect outside click
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const showHideClassName = dropDown
    ? "dropdown-content display-block"
    : "dropdown-content display-none";

  return (
    <>
      <div className="header">
        <img src={Logo} alt="logo" className="logo" onClick={handleHome} />
        <div className="navLinks">
          {localStorage.getItem("jwt-token") === null && (
            <>
              <button className="link1" onClick={handleLogin}>
                Login
              </button>
              <button className="link2" onClick={handleStart}>
                Get started
              </button>
            </>
          )}
          {localStorage.getItem("jwt-token") !== null && (
            <>
              <button
                className="link2"
                style={{ marginRight: "1%" }}
                onClick={handleConvert}
              >
                Convert
              </button>
              <div className="dropdown">
                <button onClick={handleDropDown} className="dropbtn">
                  <AccountLogin />
                  <span className="username">
                    {/* {titleCase(localStorage.getItem("user"))}{" "} */}
                    User
                  </span>
                </button>
                <div id="myDropdown" ref={ref} className={showHideClassName}>
                  <a href="/account">Account </a>
                  <a href="/filter-history">History </a>
                  <button className="logout" onClick={handleLogout}>
                    Logout
                  </button>{" "}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div>
        <Modal show={show} handleClose={handleClose}>
          <Login handleModalClose={handleModalClose} />
        </Modal>
      </div>
    </>
  );
};

export default Header;
