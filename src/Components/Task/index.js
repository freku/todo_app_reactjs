import React from "react";
import "./styles.css";
import { ReactComponent as CheckIcon } from "../../icons/crop_din-24px.svg";
import { ReactComponent as ImportantIcon } from "../../icons/grade-24px.svg";
import { ReactComponent as ImportantFullIcon } from "../../icons/grade-24px-full.svg";
import { ReactComponent as CheckedIcon } from "../../icons/circle-checked.svg";

const Task = (props) => {
  return (
    <div className="task" onClick={props.onClick}>
      <div className="check-icon">
        <CheckIcon />
      </div>

      <div className="task-center">
        <div className="dates">
          <span>20.02.2020</span>
        </div>
        <div className="task-title">
          <p>
            Integer eget dignissim ligula. Vestibulum ornare, purus at aliquet
            varius, nisl metus pretium purus.
          </p>
        </div>
        <div className="subtask-count">
          <span>1</span>
        </div>
      </div>

      <div className="make-special-icon">
        <ImportantIcon />
      </div>
    </div>
  );
};

export default Task;
