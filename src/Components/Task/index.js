import React from "react";
import "./styles.css";
import { CheckIcon, StarIcon, StarFullIcon, CheckedIcon, SunIcon } from "../../icons";

const getSubtasksCount = (data) => {
  let amount = 0,
    left = 0;

  if (data.subtasks) {
    for (let el in data.subtasks) {
      amount++;
      left++;

      if (data.subtasks[el].done) left--;
    }
  }

  return [left, amount];
};

const getTimeLeft = (deadline) => {
  let now = new Date().getTime();
  let days_left = Math.abs(deadline - now) / (1000 * 3600 * 24);

  return days_left.toFixed(2);
};

const Task = ({ data, firebase, user, taskID, ...props }) => {
  const date = new Date(data.created_at);
  const isImportant = data.is_important;
  const [stLeft, stAll] = getSubtasksCount(data);

  const onCheckClick = (e) => {
    firebase.setTaskCheck(user.uid, taskID, !data.done);
  };

  const onImportantClick = (e) => {
    const result = data.is_important === undefined ? true : !data.is_important;
    firebase.setTaskImportant(user.uid, taskID, result);
  };

  return (
    <div className="task">
      <div onClick={onCheckClick} className="check-icon">
        {data.done ? <CheckedIcon /> : <CheckIcon />}
      </div>

      <div className="task-center" onClick={props.onClick}>
        <div className="dates">
          <span>{`${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()} ${
            data.deadline !== undefined ? `(${getTimeLeft(data.deadline)} days left)` : ""
          }`}</span>
        </div>
        <div className="task-title">
          <p>{data.description || "Empty"}</p>
        </div>
        <div className="subtask-count">
          {data.is_today ? <SunIcon width="10" height="10" /> : ''}
          <span>{stAll > 0 && `${stAll - stLeft} from ${stAll}`}</span>
        </div>
      </div>

      <div onClick={onImportantClick} className="make-special-icon">
        {isImportant ? <StarFullIcon /> : <StarIcon />}
      </div>
    </div>
  );
};

export default Task;
