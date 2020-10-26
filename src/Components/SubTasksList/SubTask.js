import React, { useState } from "react";
import { CheckIcon, CheckedIcon, RemoveIcon } from "../../icons";

const SubTask = ({
  data,
  firebase,
  handleRemoveClick,
  subtaskID,
  user,
  currentTask,
  ...props
}) => {
  const [hover, setHover] = useState(false);

  const onCheckClick = (e) => {
    firebase.setSubtaskCheck(user.uid, currentTask.key, subtaskID, !data.done);
  };

  return (
    <div
      className="sub-task"
      onMouseEnter={(e) => setHover(1)}
      onMouseLeave={(e) => setHover(0)}
    >
      <div onClick={onCheckClick} className="sub-icon">
        {data.done ? <CheckedIcon /> : <CheckIcon />}
      </div>

      <div className="sub-task-description">
        <p>{data.description}</p>
      </div>

      <div className={`sub-delete-icon ${hover ? "" : "del-seen"}`}>
        <RemoveIcon style={{cursor: 'pointer'}} onClick={(e) => handleRemoveClick(e, subtaskID)} />
      </div>
    </div>
  );
};

export default SubTask;
