import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/stylesheets/App.css";
import Header from "./console/Header";
import LandingPage from "./console/LandingPage";
import ImageService from "./console/ImageService";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/image-conversion" element={<ImageService />} />
      </Routes>
    </Router>
  );
};

export default App;
