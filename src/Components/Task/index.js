import React from "react";
import "./styles.css";
import { CheckIcon, StarIcon, StarFullIcon } from "../../icons";

const Task = ({ data, ...props }) => {
  const date = new Date(data.created_at);
  const isImportant = data.is_important;
  return (
    <div className="task" {...props}>
      <div className="check-icon">
        <CheckIcon />
      </div>

      <div className="task-center">
        <div className="dates">
          <span>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</span>
        </div>
        <div className="task-title">
          <p>{data.description || "Empty"}</p>
        </div>
        <div className="subtask-count">
          <span>1</span>
        </div>
      </div>

      <div className="make-special-icon">
        {isImportant ? <StarFullIcon /> : <StarIcon />}
      </div>
    </div>
  );
};

export default Task;
