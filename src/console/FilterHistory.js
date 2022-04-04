import React from "react";
import "../assets/stylesheets/FilterHistory.css";
const FilterHistory = () => {
  const handleDelete = (event) => {
    event.preventDefault();
    console.log("Delete clciked");
  };
  return (
    <div className="filter-history">
      <div className="header-container">
        <span className="border"></span>
        <h2 style={{ color: "black" }}>Filter Histroy</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th colSpan="2">No.</th>
            <th colSpan="6">Picture</th>
            <th colSpan="4">Filter</th>
            <th colSpan="4">Date</th>
            <th colSpan="6"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2">1</td>
            <td colSpan="6">
              <img />
            </td>
            <td colSpan="4">Filter 1</td>
            <td colSpan="4"> March 25th 2022</td>
            <td colSpan="6">
              <a href="#" download className="download">
                Download
              </a>
              <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default FilterHistory;
