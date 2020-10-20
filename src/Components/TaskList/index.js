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
      </div>
      <div className="input-box">
        <div className='icon'>
          <SendIcon />
        </div>
        <input type="text" name="task-name" />
      </div>
      {/* <div className="blured-bg seen"></div> */}
      <div className="blured-bg"></div>

      {/* <div className="task-options-bar"></div> */}
    </div>
  );
};

export default TaskList;
