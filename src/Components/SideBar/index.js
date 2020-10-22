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
        <p className='sidebar-btn-desc'>Today</p>
      </div>
      <div className="sidebar-button active">
        <ImportantIcon />
        <p className='sidebar-btn-desc'>Important</p>
      </div>
      <div className="sidebar-button">
        <PlannedIcon />
        <p className='sidebar-btn-desc'>Planned</p>
      </div>
      <div className="sidebar-button">
        <TaskListIcon />
        <p className='sidebar-btn-desc'>Task List</p>
      </div>
      <div className="sidebar-button">
        <AddTaskListIcon />
        <p className='sidebar-btn-desc'>Add New List</p>
      </div>
    </div>
  );
};

export default SideBar;
