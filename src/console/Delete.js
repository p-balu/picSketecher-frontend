import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/stylesheets/Delete.css";
import { titleCase } from "title-case";
import Moment from "react-moment";
import Loader from "../components/Loader";
const Delete = ({
  handleModalClose,
  imageId,
  handleError,
  handleSuccess,
  handleRefreh,
}) => {
  const [imageBytes, setImageBytes] = useState([]);

  useEffect(() => {
    if (imageId) {
      const request = {
        method: "GET",
        // headers: { "Content-Type": "application/json" },
        params: {
          id: imageId,
          isUser: false,
        },
      };
      axios.get("http://stage-picksetcher.herokuapp.com/save/", request).then((res) => {
        if (res.data.success == true) {
          setImageBytes(res.data.image_data);
        } else {
          handleSuccess("");
          handleError("Unable to fetch images server error occured");
        }
      });
    }
  }, [imageId]);

  const handleCancel = (event) => {
    event.preventDefault();
    handleModalClose(false);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const request = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: imageId,
        isUser: false,
      }),
    };
    fetch("http://stage-picksetcher.herokuapp.com/save/", request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success == "True") {
          handleError("");
          handleModalClose(false);
          handleSuccess("Image Deleted Successfully");
          handleRefreh(true);
        } else {
          handleSuccess("");
          handleError("Unable to delete images server error occured");
        }
      });
  };

  console.log(imageBytes);
  return (
    <>
      {imageBytes && imageBytes[0] != undefined && (
        <div>
          <h3 style={{ color: "black" }}>Permanently delete this picture?</h3>
          <div className="delete-container">
            <img src={imageBytes[0].image} className="table-image" />
            <p
              style={{ padding: "17px 0", color: "black", fontWeight: "bold" }}
            >
              {titleCase(imageBytes[0].filter)}
            </p>
            <p style={{ padding: "17px 0" }}>
              {" "}
              <Moment>{imageBytes[0].date_created}</Moment>
            </p>
          </div>
          <div className="buttons">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="delete-button-1" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
      {imageBytes[0] == undefined && <Loader />}
    </>
  );
};
export default Delete;
