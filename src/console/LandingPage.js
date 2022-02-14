import React, { useState } from "react";
import Sketch from "../assets/images/main-pic.png";
import "../assets/stylesheets/LandingPage.css";
const LandingPage = () => {
  const [show, setShow] = useState(false);
  //get started onClick event handler
  const handleClick = (event) => {
    event.preventDefault();
    console.log("get started clicked");
  };

  return (
    <div className="container">
      <div className="container-1">
        <p className="text-1">Discover</p>
        <p className="text-2">NEW</p>
        <p className="text-3">From your picture</p>
        <button className="button" onClick={handleClick}>
          Get started
        </button>
      </div>
      <div className="container-2">
        <img src={Sketch} alt="sketch" className="image-sketch" />
      </div>
    </div>
  );
};
export default LandingPage;
