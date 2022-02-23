import React from "react";
import "./Alert.css";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";

const Alert = () => {
  return (
    <div className="alert">
      <FaExclamationCircle size={16} className="icon-x" />
      <span className="msg">Please enter name and date</span>
      <div className="close-btn">
        <FaTimes size={19} className="icon-x" />
      </div>
    </div>
  );
};

export default Alert;
