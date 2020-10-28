import React, { useContext, useState, useEffect } from "react";
import Task from "../Task";
import TaskOptionsBar from "../TaskOptionsBar";
import { FirebaseContext } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SendIcon, LoadingCircleIcon } from "../../icons";
import InputBox from "./InputBox";

import "./styles.css";

const TaskList = ({ taskPage, listName, ...props }) => {
  const [taskBar, setTaskBar] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [areSomeDone, setAreSomeDone] = useState(false);
  const [tasks, setTasks] = useState({});
  // fucking useless, delete it later
  const [currentTask, setCurrentTask] = useState(null);
  const firebase = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth);

  const taskListToShow = tasks[taskPage].map((val, i) => {
    if (!val.val().done) {
      return (
        <Task
          data={val.val()}
          key={i}
          firebase={firebase}
          user={user}
          taskID={val.key}
          onClick={(e) => onTaskClick(e, true, tasks[taskPage][i])}
        />
      );
    }
  });

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
    setAreSomeDone(false);

    return () => ref.off();
  }, [taskPage]);

  return (
    <>
      {isLoading ? (
        <div className="task-list-container flex-center-both">
          <LoadingCircleIcon />
        </div>
      ) : (
        <div className="task-list-container">
          <div className="task-list-title">
            <p>{listName || taskPage || "Unknown Site"}</p>
          </div>
          <div className="task-list">
            {tasks[taskPage] &&
              tasks[taskPage].map((val, i) => {
                if (!val.val().done) {
                  return (
                    <Task
                      data={val.val()}
                      key={i}
                      firebase={firebase}
                      user={user}
                      taskID={val.key}
                      onClick={(e) => onTaskClick(e, true, tasks[taskPage][i])}
                    />
                  );
                }
              })}
            {areSomeDone && (
              <div
                style={{
                  margin: "20px",
                  marginLeft: "10px",
                }}
              >
                <span
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,.2)",
                    padding: "8px",
                    borderRadius: "5px",
                    fontWeight: "900",
                  }}
                >
                  Done Tasks:
                </span>
              </div>
            )}
            {tasks[taskPage] &&
              tasks[taskPage].map((val, i) => {
                if (val.val().done) {
                  if (!areSomeDone) {
                    setAreSomeDone(true);
                  }
                  return (
                    <Task
                      data={val.val()}
                      key={i}
                      firebase={firebase}
                      user={user}
                      taskID={val.key}
                      onClick={(e) => onTaskClick(e, true, tasks[taskPage][i])}
                    />
                  );
                }
              })}
          </div>
          <InputBox
            handleSubmit={handleSubmit}
            inputVal={inputVal}
            setInputVal={setInputVal}
          />

          {taskBar && (
            <TaskOptionsBar
              // currentTask={currentTask}
              // wombo combo like this because currentTask didnt refresh after changing value in rt db
              // at least in TaskNameButton
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
