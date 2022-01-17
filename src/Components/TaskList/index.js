import React, { useState, useEffect } from "react";
import Task from "../Task";
import TaskOptionsBar from "../TaskOptionsBar";
import { useFirebaseWithUser } from "../../Firebase";
import { LoadingCircleIcon } from "../../icons";
import InputBox from "./InputBox";

import "./styles.css";

const TaskList = ({ taskPage, listName, ...props }) => {
  const [taskBar, setTaskBar] = useState(false); // show or not to show Task Bar
  const [inputVal, setInputVal] = useState("");
  const [doneTasks, setDoneTasks] = useState([]);
  const [notdoneTasks, setNotDoneTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [firebase, user, loading, error] = useFirebaseWithUser();

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
      setTasks(ts);

      // console.log('============================');
      // console.log(taskPage);
      // console.log(ts);
      // console.log(ts[taskPage]);
      // console.log('============================');

      setNotDoneTasks(
        ts[taskPage] &&
          ts[taskPage].filter((ob) => !ob.val().done).map((val, i) => val)
      );

      setDoneTasks(
        ts[taskPage] &&
          ts[taskPage].filter((ob) => ob.val().done).map((val, i) => val)
      );
    });

    return () => ref.off();
  }, [taskPage, firebase, user]);

  return (
    <>
      {!tasks ? (
        <div className="task-list-container flex-center-both">
          <LoadingCircleIcon />
        </div>
      ) : (
        <div className="task-list-container">
          <div className="task-list-title">
            <p>{listName || taskPage || "Unknown Site"}</p>
          </div>
          <div className="task-list">
            {notdoneTasks.map((val, i) => (
              <Task
                data={val.val()}
                key={i}
                firebase={firebase}
                user={user}
                taskID={val.key}
                onClick={(e) => onTaskClick(e, true, tasks[taskPage][i])}
              />
            ))}
            {doneTasks.length > 0 && (
              <div className="done-tasks">
                <span>Done Tasks:</span>
              </div>
            )}
            {doneTasks.map((val, i) => (
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
          <InputBox
            handleSubmit={handleSubmit}
            inputVal={inputVal}
            setInputVal={setInputVal}
          />

          {taskBar && (
            <TaskOptionsBar
              currentTask={
                tasks[taskPage].filter((el) => el.key === currentTask.key)[0]
              }
              hideCall={() => setTaskBar(!taskBar)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TaskList;
