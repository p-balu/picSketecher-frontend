import React, { useState, useRef, useEffect } from "react";
import "../assets/stylesheets/ImageService.css";
import Loader from "../components/Loader";
import { titleCase } from "title-case";
const ImageService = () => {
  const fileInputField = useRef(null);
  const [fileUrl, setFileUrl] = useState({});
  const [file, setFile] = useState({});
  const [imagePreview, setImagePreview] = useState(false);
  const [outputImagePreview, setOutputImagePreview] = useState(false);
  const [imageBytes, setImageBytes] = useState("");
  const [outputImageBytes, setOutputImageBytes] = useState("");
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleBrowseFile = () => {
    fileInputField.current.click();
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileUrl(URL.createObjectURL(event.target.files[0]));
    setImagePreview(true);
    setStyle("original");
  };

  //checks if the object is empty or not
  const isEmpty = (object) => {
    for (const property in object) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!isEmpty(file)) {
      const reader = new FileReader();
      reader.onload = function () {
        let base64result = reader.result.split(",")[1];
        setImageBytes(base64result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  // const handleFilterClick = (event) => {
  //   event.preventDefault();
  // };

  const handleClear = (event) => {
    event.preventDefault();
    setFile({});
    setFileUrl({});
    setImagePreview(false);
    setOutputImagePreview(false);
    setImageBytes("");
    setError("");
    setSuccess("");
  };

  const handleFilterChange = (event, value) => {
    event.preventDefault();
    setOutputImagePreview(false);
    setLoading(true);
    setStyle(value);
    console.log("apply filters onchange", value);
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_bytes: imageBytes,
        style: value,
      }),
    };
    fetch("http://localhost:8000/upload/", request)
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          let base64 = "data:image/png;base64,";
          let output = base64 + data.image_bytes;
          setOutputImageBytes(output);
          setLoading(false);
          setOutputImagePreview(true);
          setError("");
        } else {
          setError(data.message);
        }
      });
  };

  const handleFilterOrginial = () => {
    setStyle("original");
    setOutputImageBytes(fileUrl);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_bytes: outputImageBytes,
        filter_type: style,
        id: localStorage.getItem("user"),
      }),
    };
    fetch("http://localhost:8000/save/", request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.message);
        if (data.success == false) {
          setSuccess("");
          setError("Image storing unsuccessfull");
        } else {
          console.log("entered");
          setError("");
          setSuccess("Image saved successfully");
        }
      });
  };

  //handle cartoon image and make an api call to another server
  const handleCartooning = (event) => {
    event.preventDefault();
    setOutputImagePreview(false);
    setOutputImageBytes("");
    setLoading(true);
    setStyle("cartoon");
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With",
      },
      body: JSON.stringify({
        image_bytes: imageBytes,
      }),
    };
    fetch("http://localhost:5000/file-upload", request)
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "File successfully uploaded") {
          let base64 = "data:image/png;base64,";
          let string = data.url.slice(0, -1);
          let finalString = string.slice(2);
          let output = base64 + finalString;
          setOutputImageBytes(output);
          setLoading(false);
          setOutputImagePreview(true);
          setError("");
        } else {
          setError(data.message);
        }
      });
  };

  const addClassName = isEmpty(file) ? "filter-section not" : "filter-section";
  const disabled = isEmpty(file) ? true : false;
  return (
    <>
      <div className="messages">
        {success && <div className="success">{titleCase(success)}</div>}
        {error && <div className="error">{titleCase(error)}</div>}
      </div>

      <div className="image-conversion">
        <div className="section-1">
          <p className="filter-header">Choose your filter</p>
          <div className="sub-section-1">
            <button
              id="btn-original"
              className={addClassName}
              style={
                style === "original" ? { border: "2px solid #365a0c" } : null
              }
              onClick={handleFilterOrginial}
              disabled={disabled}
            >
              <p className="filter-section-text">Original</p>
            </button>
            <button
              id="btn-sketch"
              className={addClassName}
              disabled={disabled}
              onClick={(event) => handleFilterChange(event, "gray")}
              style={style === "gray" ? { border: "2px solid #365a0c" } : null}
            >
              <p className="filter-section-text">Pencil Sketch</p>
            </button>
            <button
              id="btn-vangogh"
              className={addClassName}
              disabled={disabled}
              onClick={(event) => handleFilterChange(event, "van")}
              style={style === "van" ? { border: "2px solid #365a0c" } : null}
            >
              <p className="filter-section-text">Van Gogh</p>
            </button>
            <button
              id="btn-chenke"
              className={addClassName}
              disabled={disabled}
              onClick={(event) => handleFilterChange(event, "chen")}
              style={style === "chen" ? { border: "2px solid #365a0c" } : null}
            >
              <p className="filter-section-text">Chen ke</p>
            </button>
            <button
              id="btn-cartoon"
              className={addClassName}
              disabled={disabled}
              onClick={handleCartooning}
              style={
                style === "cartoon" ? { border: "2px solid #365a0c" } : null
              }
            >
              <p className="filter-section-text">Cartooning</p>
            </button>
          </div>
        </div>
        <div className="section-2">
          {loading == false ? (
            outputImagePreview == false ? (
              imagePreview == false ? (
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
              )
            ) : (
              <img src={outputImageBytes} className="uploaded-section" />
            )
          ) : (
            <div className="uploaded-section">
              <Loader />
            </div>
          )}

          <div className="buttons-container">
            <button className="clear-button" onClick={handleClear}>
              Clear
            </button>
            {/**/}
            {outputImagePreview && (
              <>
                <a href={outputImageBytes} download className="download-button">
                  Download
                </a>
                {localStorage.getItem("jwt-token") && (
                  <button className="apply-button" onClick={handleSave}>
                    Save
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ImageService;
