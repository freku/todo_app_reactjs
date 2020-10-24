import React, { useContext, useState } from "react";
import Task from "../Task";
import TaskOptionsBar from "../TaskOptionsBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { SendIcon } from "../../icons";

import "./styles.css";
import { FirebaseContext } from "../../Firebase";

const getTimeLeft = (days_from_now, timestamp) => {
  let future_date = new Date(timestamp).getTime();
  let now = new Date().getTime();
  future_date = new Date(future_date + 1000 * 60 * 60 * 24 * days_from_now);
  let days_left = Math.abs(future_date - now) / (1000 * 360 * 24);

  return days_left;
};

const TaskList = (props) => {
  const [taskBar, settaskBar] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const firebase = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth);

  const { taskPage } = props;

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
        firebase.createPlannedTask(user.uid, inputVal);
        break;
      default:
        firebase.createListTask(user.uid, inputVal);
        break;
    }

    setInputVal("");
  };

  return (
    <div className="task-list-container">
      <div className="task-list">
        <Task onClick={() => settaskBar(true)} />
        <Task onClick={() => settaskBar(true)} />
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

      {taskBar && <TaskOptionsBar hideCall={() => settaskBar(!taskBar)} />}
    </div>
  );
};

export default TaskList;
