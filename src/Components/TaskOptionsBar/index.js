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
        <TaskNameButton task={currentTask} />
        <SubTaskList currentTask={currentTask} />

        <AddToTodayButton hideCall={props.hideCall} currentTask={currentTask} />
        <SetDeadLineButton
          hideCall={props.hideCall}
          currentTask={currentTask}
        />
        <RemoveTaskButton hideCall={props.hideCall} currentTask={currentTask} />
      </div>
    </>
  );
};

export default TaskOptionsBar;
