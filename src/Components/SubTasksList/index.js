import React, { useState } from "react";
import { ReactComponent as CheckIcon } from "../../icons/crop_din-24px.svg";
import { ReactComponent as CancelIcon } from "../../icons/clear-24px.svg";
import { ReactComponent as AddIcon } from "../../icons/add.svg";

import "./styles.css";

const SubTask = (props) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="sub-task"
      onMouseEnter={(e) => setHover(1)}
      onMouseLeave={(e) => setHover(0)}
    >
      <div className="sub-icon">
        <CheckIcon />
      </div>

      <div className="sub-task-description">
        <p>Sed vel consequat mauris.</p>
      </div>

      <div className={`sub-delete-icon ${hover ? "" : "del-seen"}`}>
        <CancelIcon />
      </div>
    </div>
  );
};

const SubTasksList = (props) => {
  return (
    <div className="sub-tasks-list">
      <SubTask />
      <SubTask />
      <SubTask />
      <SubTask />

      <div className="add-sub-task">
        <div className="add-icon">
          <AddIcon />
        </div>

        <p>Add another subtask</p>
      </div>
    </div>
  );
};

export default SubTasksList;

export { SubTask };
