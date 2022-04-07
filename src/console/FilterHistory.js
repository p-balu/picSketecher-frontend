import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/stylesheets/FilterHistory.css";
import { titleCase } from "title-case";
import Moment from "react-moment";
import Delete from "./Delete";
import Modal from "../components/Modal";

const FilterHistory = () => {
  const [imageBytes, setImageBytes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageId, setImageId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);

  const handleDelete = (event, id, userId) => {
    event.preventDefault();
    setShow(true);
    setImageId(id);
  };

  const handleModalClose = (value) => {
    setShow(value);
  };

  const handleSuccess = (value) => {
    setSuccess(value);
  };

  const handleError = (value) => {
    setError(value);
  };

  const handleRefresh = (value) => {
    setRefresh(value);
  };
  useEffect(() => {
    const id = localStorage.getItem("user");
    console.log(id);
    console.log(typeof id);
    const request = {
      method: "GET",
      // headers: { "Content-Type": "application/json" },
      params: {
        id: id,
        is_User: true,
      },
    };
    axios.get("http://localhost:8000/save/", request).then((res) => {
      if (res.data.success == true) {
        console.log(res.data.image_data);
        setImageBytes(res.data.image_data);
        setRefresh(false);
      } else {
        setSuccess("");
        setError("Unable to fetch images server error occured");
        setRefresh(false);
      }
    });
  }, [refresh]);

  return (
    <>
      <div className="messages">
        {success && <div className="success">{titleCase(success)}</div>}
        {error && <div className="error">{titleCase(error)}</div>}
      </div>
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
            {imageBytes.map((image, id) => (
              <tr key={id}>
                <td colSpan="2">{id + 1}</td>
                <td colSpan="6">
                  <img src={image.image} className="table-image" />
                </td>
                <td colSpan="4">{titleCase(image.filter)}</td>
                <td colSpan="4">
                  {" "}
                  <Moment>{image.date_created}</Moment>
                </td>
                <td colSpan="6">
                  <a href={image.image} download className="download">
                    Download
                  </a>
                  <button
                    className="delete-button"
                    onClick={(event) =>
                      handleDelete(event, image.id, image.user_id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {(imageBytes.length === 0 || imageBytes === undefined) && (
              <tr>
                <td
                  colSpan="22"
                  style={{
                    fontSize: "2rem",
                    fontWeight: "500",
                    marginTop: "4%",
                    textAlign: "center",
                  }}
                >
                  No Saved Images
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={show}>
        <Delete
          handleModalClose={handleModalClose}
          handleSuccess={handleSuccess}
          handleError={handleError}
          handleRefresh={handleRefresh}
          imageId={imageId}
        />
      </Modal>
    </>
  );
};
export default FilterHistory;
