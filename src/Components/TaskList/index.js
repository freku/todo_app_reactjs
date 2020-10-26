import React, { useContext, useState, useEffect } from "react";
import Task from "../Task";
import TaskOptionsBar from "../TaskOptionsBar";
import { FirebaseContext } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SendIcon } from "../../icons";

import "./styles.css";

const TaskList = ({ taskPage, listName, ...props }) => {
  const [taskBar, setTaskBar] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState({});
  // fucking useless, delete it later
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

  const onTaskClick = (e, barVisibility, taskData) => {
    setTaskBar(barVisibility);
    setCurrentTask(taskData);
  };

  useEffect(() => {
    let ref = firebase.getTasks(user.uid, (ts) => {
      setIsLoading(false);
      setTasks(ts);
    });

    return () => ref.off();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="task-list-container">
          
        </div>
      ) : (
        <div className="task-list-container">
          <div className="task-list-title">
            <p>{listName || taskPage || "Site"}</p>
          </div>
          <div className="task-list">
            {tasks[taskPage] &&
              tasks[taskPage].map((val, i) => (
                <Task
                  data={val.val()}
                  key={i}
                  firebase={firebase}
                  user={user}
                  taskID={val.key}
                  onClick={(e) => onTaskClick(e, true, tasks[taskPage][i])}
                />
              ))}
          </div>
          <div className="input-box">
            <div className="icon">
              <SendIcon />
            </div>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexGrow: 1 }}
            >
              <input
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="task-input-el"
              />
            </form>
          </div>

          {taskBar && (
            <TaskOptionsBar
              // currentTask={currentTask}
              // wombo combo like this because currentTask didnt refresh after changing value in rt db
              currentTask={(() => {
                let ret;
                tasks[taskPage].forEach((el) => {
                  if (el.key === currentTask.key) {
                    ret = el;
                  }
                });
                return ret;
              })()}
              hideCall={() => setTaskBar(!taskBar)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TaskList;
