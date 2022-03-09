import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import "../assets/stylesheets/Header.css";
import Modal from "../components/Modal";
import Login from "./Login";
const Header = () => {
  const [show, setShow] = useState(false);
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
  const handleHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="header">
        <img src={Logo} alt="logo" className="logo" onClick={handleHome} />
        <div className="navLinks">
          <button className="link1" onClick={handleLogin}>
            Login
          </button>
          <button className="link2" onClick={handleStart}>
            Get started
          </button>
        </div>
      </div>

      <div>
        <Modal show={show} handleClose={handleClose}>
          <Login />
        </Modal>
      </div>
    </>
  );
};

export default Header;
