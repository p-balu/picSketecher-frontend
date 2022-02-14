import {
  faClosedCaptioning,
  faTimes,
  faTimesCircle,
  faWindowClose,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Modal.css";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button className="button-close" onClick={handleClose}>
          x
        </button>
        {children}
      </section>
    </div>
  );
};

export default Modal;
