import React from "react";
import { FaCheckDouble, FaEdit, FaTrashAlt } from "react-icons/fa";

const Task = () => {
  return (
    <div className="task">
      <span>
        <p>
          <b>Task:</b> Task one
        </p>
        <p>
          <b>Date:</b> 2022-02-22
        </p>
      </span>
      <span>
        <button>
          <FaEdit color="green" />
        </button>
        <button>
          <FaTrashAlt color="red" />
        </button>
        <button>
          <FaCheckDouble color="purple" />
        </button>
      </span>
    </div>
  );
};

export default Task;
