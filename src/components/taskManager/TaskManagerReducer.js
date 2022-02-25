import { useState, useRef, useEffect, useReducer } from "react";
import useLocalStorage from "use-local-storage";
import Alert from "../alert/Alert";
import Confirm from "../confirm/Confirm";
import Task from "./Task";
import "./TaskManager.css";

const taskReducer = (state, action) => {
  if (action.type === "EMPTY_FIELD") {
    return {
      ...state,
      isAlertOpen: true,
      alertContent: "Please enter name and date",
      alertClass: "danger",
    };
  }

  if (action.type === "CLOSE_ALERT") {
    return { ...state, isAlertOpen: false };
  }

  if (action.type === "ADD_TASK") {
    console.log(action.payload);
    const allTasks = [...state.tasks, action.payload];
    return {
      ...state,
      tasks: allTasks,
      isAlertOpen: true,
      alertContent: "Task added successfully",
      alertClass: "success",
    };
  }

  if (action.type === "OPEN_EDIT_MODAL") {
    console.log(action.payload);
    return {
      ...state,
      taskID: action.payload,
      isEditModalOpen: true,
      modalTitle: "Edit Task",
      modalMsg: "You are about to edit this task",
      modalActionText: "Edit",
    };
  }

  if (action.type === "CLOSE_MODAL") {
    return { ...state, isEditModalOpen: false };
  }

  if (action.type === "EDIT_TASK") {
    return { ...state, isEditing: true };
  }

  if (action.type === "UPDATE_TASK") {
    console.log(action.payload);
    const updatedTask = action.payload;
    const id = action.payload.id;

    // Find the task index
    const taskIndex = state.tasks.findIndex((task) => {
      return task.id === id;
    });
    // Replace the task by its index
    if (taskIndex !== -1) {
      state.tasks[taskIndex] = updatedTask;
    }

    return {
      ...state,
      isEditing: false,
      isAlertOpen: true,
      alertContent: " Task edited successfully",
      alertClass: "success",
    };
  }

  return state;
};

const TaskManagerReducer = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const initialState = {
    tasks,
    taskID: null,
    isEditing: false,
    isAlertOpen: false,
    alertContent: "This is an alert",
    alertClass: "danger",
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    modalTitle: "Delete Task",
    modalMsg: "You are about to delete this task.",
    modalActionText: "OK",
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  });

  const closeAlert = () => {
    dispatch({
      type: "CLOSE_ALERT",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date) {
      dispatch({
        type: "EMPTY_FIELD",
      });
    }

    if (name && date && state.isEditing) {
      const updatedTask = {
        id: state.taskID,
        name,
        date,
        complete: false,
      };
      dispatch({
        type: "UPDATE_TASK",
        payload: updatedTask,
      });
      setName("");
      setDate("");
      setTasks(
        tasks.map((task) => {
          if (task.id === updatedTask.id) {
            return { ...task, name, date, complete: false };
          }
          return task;
        })
      );
      return;
    }

    if (name && date) {
      const newTask = {
        id: Date.now(),
        name,
        date,
        complete: false,
      };
      dispatch({
        type: "ADD_TASK",
        payload: newTask,
      });
      setName("");
      setDate("");
      setTasks([...tasks, newTask]);
    }
  };

  const openEditModal = (id) => {
    dispatch({
      type: "OPEN_EDIT_MODAL",
      payload: id,
    });
  };

  const editTask = () => {
    console.log(state.taskID);
    const id = state.taskID;
    dispatch({
      type: "EDIT_TASK",
      payload: id,
    });
    const thisTask = state.tasks.find((task) => task.id === id);
    setName(thisTask.name);
    setDate(thisTask.date);
    closeModal();
    console.log(state.isEditing);
  };

  const deleteTask = (id) => {};

  const completeTask = (id) => {};

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
    });
  };

  return (
    <div className="--bg-primary">
      {state.isAlertOpen && (
        <Alert
          alertContent={state.alertContent}
          alertClass={state.alertClass}
          onCloseAlert={closeAlert}
        />
      )}
      {state.isEditModalOpen && (
        <Confirm
          modalTitle={state.modalTitle}
          modalMsg={state.modalMsg}
          modalActionText={state.modalActionText}
          modalAction={editTask}
          onCloseModal={closeModal}
        />
      )}

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
              {state.isEditing ? "Edit Task" : "Save Task"}
            </button>
          </form>
        </div>
      </div>
      {/* Display Task */}

      <article className="--flex-center --my2">
        <div className="--width-500px --p">
          <h2 className="--text-light">Task List</h2>
          <hr style={{ background: "#fff" }} />
          {state.tasks.length === 0 ? (
            <p className="--text-light">No task added...</p>
          ) : (
            <div>
              {state.tasks.map((task) => {
                return (
                  <Task
                    {...task}
                    editTask={openEditModal}
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
