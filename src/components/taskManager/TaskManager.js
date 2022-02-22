import { useState, useRef, useEffect } from "react";
import Task from "./Task";
import "./TaskManager.css";

const TaskManager = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(date);
  };

  return (
    <div className="--bg-primary">
      <h1 className="--text-center --text-light">Task Manager</h1>
      <div className="--flex-center --p">
        <div className="--card --bg-light --width-500px --p --flex-center">
          <form onSubmit={handleSubmit} className="form --form-control">
            <div>
              <label htmlFor="name">Task:</label>
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Task name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="date">Task:</label>
              <input
                type="date"
                placeholder="Task name"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button className="--btn --btn-success --btn-block">
              Save Task
            </button>
          </form>
        </div>
      </div>
      {/* Display Task */}

      <article className="--flex-center --my2">
        <div className="--width-500px --p">
          <h2 className="--text-light">Task List</h2>
          <hr style={{ background: "#fff" }} />
          <Task />
        </div>
      </article>
    </div>
  );
};

export default TaskManager;
