import { faCaretSquareDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import "../assets/stylesheets/Header.css";
import Modal from "../components/Modal";
import Login from "./Login";
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

  const handleLogout = () => {
    console.log("logout clicked");
    localStorage.removeItem("jwt-token");
    navigate("/");
  };

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

  console.log("jwt-token", localStorage.getItem("jwt-token"));

  const showHideClassName = dropDown
    ? "dropdown-content display-block"
    : "dropdown-content display-none";

  return (
    <>
      <div className="header">
        <img src={Logo} alt="logo" className="logo" onClick={handleHome} />
        <div className="navLinks">
          {localStorage.getItem("jwt-token") === null && (
            <button className="link1" onClick={handleLogin}>
              Login
            </button>
          )}
          {localStorage.getItem("jwt-token") !== null && (
            <div className="dropdown">
              <button onClick={handleDropDown} className="dropbtn">
                Account <FontAwesomeIcon icon={faCaretSquareDown} />
              </button>
              <div id="myDropdown" ref={ref} className={showHideClassName}>
                <a href="#">Profile</a>
                <a href="#">Settings</a>
                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>{" "}
              </div>
            </div>
          )}
          <button className="link2" onClick={handleStart}>
            Get started
          </button>
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
