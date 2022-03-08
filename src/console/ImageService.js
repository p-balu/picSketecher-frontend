import React, { useState, useRef } from "react";
import "../assets/stylesheets/ImageService.css";
import List from "react-list-select";
const ImageService = () => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});
  const [imagePreview, setImagePreview] = useState(false);

  const handleBrowseFile = () => {
    fileInputField.current.click();
  };
  const handleFileChange = (event) => {
    setFiles(URL.createObjectURL(event.target.files[0]));
    setImagePreview(true);
  };
  let items = ["Google", "TED", "GitHub", "Big Think", "Microsoft"];

  return (
    <div>
      <div>
        <p>Choose your filter</p>
        <List
          items={items}
          selected={[0]}
          disabled={[4]}
          multiple={false}
          onChange={(event) => {
            console.log(event);
          }}
        />
      </div>
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
          />
        </section>
      ) : (
        <img src={files} className="uploaded-section" />
      )}

      <div className="buttons-container">
        <button className="clear-button">Clear</button>
        <button className="apply-button">Apply</button>
      </div>
    </div>
  );
};
export default ImageService;
