import React, { useEffect, useState } from "react";
import Task from "../Task";
import TaskOptionsBar from "../TaskOptionsBar";
import { ReactComponent as SendIcon } from "../../icons/send-24px.svg";

import "./styles.css";

const TaskList = (props) => {
  const [taskBar, settaskBar] = useState(false);
  const [tasks, setTasks] = useState(null);
  const { taskPage } = props;

  useEffect(() => {
    console.log(`task_lists/userid/taskPage`);
  })

  return (
    <div className="task-list-container">
      <div className="task-list">
        <Task onClick={() => settaskBar(true)} />
        <Task onClick={() => settaskBar(true)} />
      </div>
      <div className="input-box">
        <div className="icon">
          <SendIcon />
        </div>
        <input type="text" name="task-name" />
      </div>

      {taskBar && <TaskOptionsBar hideCall={() => settaskBar(!taskBar)} />}
    </div>
  );
};

export default TaskList;
