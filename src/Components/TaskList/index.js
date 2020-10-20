import React from "react";
import { ReactComponent as SendIcon } from "../../icons/send-24px.svg";
import Task from '../Task';
import "./styles.css";

const TaskList = (props) => {
  return (
    <div className="task-list-container">
      <div className="task-list">
        <Task />
        <Task />
        <Task />
      </div>
      <div className="input-box">
        <div class='icon'>
          <SendIcon />
        </div>
        <input type="text" name="task-name" />
      </div>
    </div>
  );
};

export default TaskList;
