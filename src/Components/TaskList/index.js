import React, { useContext, useState, useEffect } from "react";
import Task from "../Task";
import TaskOptionsBar from "../TaskOptionsBar";
import { FirebaseContext } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SendIcon } from "../../icons";

import "./styles.css";

const getTimeLeft = (days_from_now, timestamp) => {
  let future_date = new Date(timestamp).getTime();
  let now = new Date().getTime();
  future_date = new Date(future_date + 1000 * 60 * 60 * 24 * days_from_now);
  let days_left = Math.abs(future_date - now) / (1000 * 360 * 24);

  return days_left;
};

const TaskList = ({ taskPage, listName, ...props }) => {
  const [taskBar, setTaskBar] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [tasks, setTasks] = useState({});
  const [currentTask, setCurrentTask] = useState(null);
  const firebase = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim().length === 0) return;

    switch (taskPage) {
      case "today":
        firebase.createTodayTask(user.uid, inputVal);
        break;
      case "important":
        firebase.createImportantTask(user.uid, inputVal);
        break;
      case "planned":
        firebase.createPlannedTask(user.uid, inputVal);
        break;
      case undefined:
      case null:
      case "tasklist":
        firebase.createNormalTask(user.uid, inputVal);
        break;
      default:
        firebase.createListTask(user.uid, inputVal, taskPage);
        break;
    }

    setInputVal("");
  };

  const middleware = (ts) => {
    setTasks(ts);
  };

  const onTaskClick = (e, barVisibility, taskData) => {
    setTaskBar(barVisibility);
    setCurrentTask(taskData);

    console.log(taskData.key);
  };

  useEffect(() => {
    let ref = firebase.getTasks(user.uid, (ts) => middleware(ts));

    return () => ref.off();
  }, []);

  return (
    <div className="task-list-container">
      <div className="task-list-title">
        <p>{listName || taskPage || "Site"}</p>
      </div>
      <div className="task-list">
        {tasks[taskPage] &&
          tasks[taskPage].map((val, i) => (
            <Task data={val.val()} key={i} onClick={(e) => onTaskClick(e, true, val)} />
          ))}
      </div>
      <div className="input-box">
        <div className="icon">
          <SendIcon />
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexGrow: 1 }}>
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="task-input-el"
          />
        </form>
      </div>

      {taskBar && <TaskOptionsBar currentTask={currentTask} hideCall={() => setTaskBar(!taskBar)} />}
    </div>
  );
};

export default TaskList;
