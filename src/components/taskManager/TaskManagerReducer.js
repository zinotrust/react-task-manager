import { useState, useRef, useEffect, useReducer } from "react";
import useLocalStorage from "use-local-storage";
import Alert from "../alert/Alert";
import Confirm from "../confirm/Confirm";
import Task from "./Task";
import "./TaskManager.css";

const taskReducer = (state, action) => {};

const TaskManagerReducer = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const initialState = {
    tasks,
    taskID: null,
    isEditing: false,
    isAlertOpen: true,
    alertContent: "This is an alert",
    alertClass: "danger",
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  });

  const closeAlert = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const editTask = (id) => {};

  const deleteTask = (id) => {};

  const completeTask = (id) => {};

  return (
    <div className="--bg-primary">
      {state.isAlertOpen && (
        <Alert
          alertContent={state.alertContent}
          alertClass={state.alertClass}
          onCloseAlert={closeAlert}
        />
      )}

      {/* <Confirm /> */}
      <h2 className="--text-center --text-light">Task Manager Reducer</h2>
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
          {tasks.length === 0 ? (
            <p className="--text-light">No task added...</p>
          ) : (
            <div>
              {tasks.map((task) => {
                return (
                  <Task
                    {...task}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    completeTask={completeTask}
                  />
                );
              })}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default TaskManagerReducer;
