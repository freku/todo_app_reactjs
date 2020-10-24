import React, { useState } from "react";
import SubTaskList from "../SubTasksList";
import { AddToTodayButton, SetDeadLineButton, TaskNameButton } from "./Buttons";

import "./styles.css";

const TaskOptionsBar = ({ currentTask, ...props }) => {
  
  return (
    <>
      <div className="blured-bg seen" onClick={props.hideCall}></div>

      <div className="task-options-bar">
        <TaskNameButton task={currentTask} />
        <SubTaskList />

        <AddToTodayButton />
        <SetDeadLineButton />
      </div>
    </>
  );
};

export default TaskOptionsBar;
