import React from "react";
import SubTaskList from "../SubTasksList";
import TaskNameButton from "./TaskNameButton";
import AddToTodayButton from "./AddToTodayButton";
import SetDeadLineButton from "./SetDeadLineButton";
import RemoveTaskButton from "./RemoveTaskButton";

import "./styles.css";

const TaskOptionsBar = ({ currentTask, ...props }) => {
  return (
    <>
      <div className="blured-bg seen" onClick={props.hideCall}></div>

      <div className="task-options-bar">
        <div className="main-buttons">
          <TaskNameButton task={currentTask} />
          <SubTaskList currentTask={currentTask} />
        </div>

        <div className="action-buttons">
          <AddToTodayButton
            hideCall={props.hideCall}
            currentTask={currentTask}
          />
          <SetDeadLineButton
            hideCall={props.hideCall}
            currentTask={currentTask}
          />
        </div>

        <div className="bottom-menu">
          <RemoveTaskButton
            hideCall={props.hideCall}
            currentTask={currentTask}
          />
        </div>
      </div>
    </>
  );
};

export default TaskOptionsBar;
