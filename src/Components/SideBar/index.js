import React from "react";
import { ReactComponent as SunnyIcon } from "../../icons/wb_sunny-24px.svg";
import { ReactComponent as ImportantIcon } from "../../icons/grade-24px.svg";
import { ReactComponent as PlannedIcon } from "../../icons/event-24px.svg";
import { ReactComponent as TaskListIcon } from "../../icons/list_alt-24px.svg";
import { ReactComponent as AddTaskListIcon } from "../../icons/add_circle_outline-24px.svg";

import "./styles.css";

const SideBar = (props) => {
  return (
    <div className="sidebar">
      <div className="sidebar-button">
        <SunnyIcon />
      </div>
      <div className="sidebar-button active">
        <ImportantIcon />
      </div>
      <div className="sidebar-button">
        <PlannedIcon />
      </div>
      <div className="sidebar-button">
        <TaskListIcon />
      </div>
      <div className="sidebar-button">
        <AddTaskListIcon />
      </div>
    </div>
  );
};

export default SideBar;
