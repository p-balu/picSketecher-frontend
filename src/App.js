import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./assets/stylesheets/App.css";
import "./assets/stylesheets/LoginForm.css";
import Header from "./console/Header";
import LandingPage from "./console/LandingPage";
import ImageService from "./console/ImageService";
import Account from "./console/Account";
import FilterHistory from "./console/FilterHistory";
import NotFound from "./console/NotFound";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/image-conversion" element={<ImageService />} />
        <Route path="/account" element={<Account />} />
        <Route path="/filter-history" element={<FilterHistory />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
