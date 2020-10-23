import React, { useContext, useState } from "react";
import { FirebaseContext, AuthUserContext } from "../../Firebase";
import { ReactComponent as SunnyIcon } from "../../icons/wb_sunny-24px.svg";
import { ReactComponent as ImportantIcon } from "../../icons/grade-24px.svg";
import { ReactComponent as PlannedIcon } from "../../icons/event-24px.svg";
import { ReactComponent as TaskListIcon } from "../../icons/list_alt-24px.svg";
import { ReactComponent as AddTaskListIcon } from "../../icons/add_circle_outline-24px.svg";

import "./styles.css";

const SideBarButton = (props) => {
  let { active, icon, description, ...rest } = props;

  return (
    <div {...rest} className={`sidebar-button ${props.active ? "active" : ""}`}>
      {props.icon}
      <p className="sidebar-btn-desc">{props.description}</p>
    </div>
  );
};

const SideBarListButton = (props) => {
  const { name, ...rest} = props;
  
  return (
    <div {...rest} className="sidebar-button">
      <p className="sidebar-btn-desc">{name}</p>
    </div>
  );
};

const SideBar = (props) => {
  const [showListInput, setShowListInput] = useState(false);
  const [newListName, setNewListName] = useState("");
  const taskList = ["Lista 1", "Lista Stroga", "Plytka lista jak"];
  const { taskPage, setTaskPage } = props;
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const handleSubmit = (e) => {
    firebase.createList(authUser.uid, newListName)
    e.preventDefault();
  };

  const handleBtnClick = (e) => {
    setTaskPage(e.target.getAttribute("pagename"));
  };

  const handleEnterKey = e => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  }

  return (
    <div className="sidebar">
      <SideBarButton
        onClick={(e) => handleBtnClick(e)}
        pagename="today"
        active={true}
        icon={<SunnyIcon />}
        description={"Today"}
      />
      <SideBarButton
        pagename="important"
        onClick={(e) => handleBtnClick(e)}
        icon={<ImportantIcon />}
        description={"Important"}
      />
      <SideBarButton
        pagename="planned"
        onClick={(e) => handleBtnClick(e)}
        icon={<PlannedIcon />}
        description={"Planned"}
      />
      <SideBarButton
        pagename="tasklist"
        onClick={(e) => handleBtnClick(e)}
        icon={<TaskListIcon />}
        description={"Task List"}
      />
    {/* pagename={task ID} w przyszlosci */}
      {taskList.map((name, i) => (
        <SideBarListButton key={i} name={name} pagename={name} onClick={(e) => handleBtnClick(e)}/>
      ))}

      {showListInput && (
        <form onSubmit={(e) => handleSubmit(e)} className="sidebar-button">
          <input
            autoFocus
            onKeyDown={handleEnterKey}
            onBlur={() => setShowListInput(false)}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </form>
      )}

      <SideBarButton
        onClick={(e) => setShowListInput(!showListInput)}
        icon={<AddTaskListIcon />}
        description={"Add New List"}
      />
    </div>
  );
};

export default SideBar;
