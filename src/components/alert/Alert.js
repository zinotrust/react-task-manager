import React from "react";
import "./Alert.css";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";

const Alert = ({ alertContent, alertClass, onCloseAlert }) => {
  return (
    <div className={`alert ${alertClass}`}>
      <FaExclamationCircle size={16} className="icon-x" />
      <span className="msg">{alertContent}</span>
      <div className="close-btn" onClick={onCloseAlert}>
        <FaTimes size={19} className="icon-x" />
      </div>
    </div>
  );
};

export default Alert;
