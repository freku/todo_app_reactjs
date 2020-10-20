import React from "react";
import "./styles.css";
import { ReactComponent as CheckIcon } from "../../icons/crop_din-24px.svg";
import { ReactComponent as ImportantIcon } from "../../icons/grade-24px.svg";

const Task = (props) => {
  return (
    <div className="task">
      <div className="check-icon">
        <CheckIcon />
      </div>

      <div class="task-center">
        <div class="dates">
          <span>20.02.2020</span>
        </div>
        <div class="task-title">
          <p>Do some task</p>
        </div>
        <div class="subtask-count">
          <span>1</span>
        </div>
      </div>
      <div class="make-special-icon">
        <ImportantIcon />
      </div>
    </div>
  );
};

export default Task;
