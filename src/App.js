import "./App.scss";
import TaskManager from "./components/taskManager/TaskManager";
import TaskManagerReducer from "./components/taskManager/TaskManagerReducer";

function App() {
  return (
    <div>
      <TaskManagerReducer />
    </div>
  );
}

export default App;
