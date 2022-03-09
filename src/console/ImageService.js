import React, { useState, useRef, useEffect } from "react";
import "../assets/stylesheets/ImageService.css";
import List from "react-list-select";
const ImageService = () => {
  const fileInputField = useRef(null);
  const [fileUrl, setFileUrl] = useState({});
  const [file, setFile] = useState({});
  const [imagePreview, setImagePreview] = useState(false);
  const [imageBytes, setImageBytes] = useState("");

  const handleBrowseFile = () => {
    fileInputField.current.click();
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileUrl(URL.createObjectURL(event.target.files[0]));
    setImagePreview(true);
  };

  //checks if the object is empty or not
  const isEmpty = (object) => {
    for (const property in object) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    console.log("useEffect entered", file);
    if (!isEmpty(file)) {
      const reader = new FileReader();
      reader.onload = function () {
        let binaryString = reader.result;
        setImageBytes(btoa(binaryString));
        console.log("image-bytes", btoa(binaryString));
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleFilterClick = (event) => {
    event.preventDefault();
    console.log("filter change clicker");
  };

  const handleClear = (event) => {
    event.preventDefault();
    setFile({});
    setFileUrl({});
    setImagePreview(false);
    setImageBytes("");
  };

  const handleApply = (event) => {
    event.preventDefault();
    console.log("apply filters clicked");
  };
  return (
    <div className="image-conversion">
      <div className="section-1">
        <p className="filter-header">Choose your filter</p>
        <div className="filter-section-active" onClick={handleFilterClick}>
          <p className="filter-section-text"> Pencil Sketch</p>
        </div>
        <div className="filter-section-2">
          <p className="filter-section-text"> Filter 1</p>
        </div>
        <div className="filter-section-2">
          <p className="filter-section-text"> Filter 2</p>
        </div>
        <div className="filter-section-2">
          <p className="filter-section-text"> Filter 3</p>
        </div>
      </div>
      <div className="section-2">
        {imagePreview == false ? (
          <section className="image-section">
            <p className="file-text">
              Drop your picture <br /> <br />
              or
            </p>
            <button
              type="button"
              onClick={handleBrowseFile}
              className="file-upload-button"
            >
              Choose File
            </button>
            <input
              type="file"
              className="file-input"
              ref={fileInputField}
              onChange={handleFileChange}
              accept=".jpeg, .png, .jpg"
            />
          </section>
        ) : (
          <img src={fileUrl} className="uploaded-section" />
        )}

        <div className="buttons-container">
          <button className="clear-button" onClick={handleClear}>
            Clear
          </button>
          <button className="apply-button" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageService;
