import React, { useContext, useState } from "react";
import SideBarButton from "./SideBarButton";
import SideBarListsBox from "./SideBarListsBox";
import { FirebaseContext } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ReactComponent as SunnyIcon } from "../../icons/wb_sunny-24px.svg";
import { ReactComponent as ImportantIcon } from "../../icons/grade-24px.svg";
import { ReactComponent as PlannedIcon } from "../../icons/event-24px.svg";
import { ReactComponent as TaskListIcon } from "../../icons/list_alt-24px.svg";

import "./styles.css";

const SideBar = (props) => {
  const { taskPage, setTaskPage } = props;
  const firebase = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth);

  const handleBtnClick = (e) => {
    setTaskPage(e.target.getAttribute("pagename"));
  };

  return (
    <div className="sidebar">
      <SideBarButton description={taskPage} />
      <SideBarButton
        onClick={handleBtnClick}
        pagename="today"
        active={taskPage === "today"}
        icon={<SunnyIcon />}
        description={"Today"}
      />
      <SideBarButton
        pagename="important"
        active={taskPage === "important"}
        onClick={handleBtnClick}
        icon={<ImportantIcon />}
        description={"Important"}
      />
      <SideBarButton
        pagename="planned"
        active={taskPage === "planned"}
        onClick={handleBtnClick}
        icon={<PlannedIcon />}
        description={"Planned"}
      />
      <SideBarButton
        pagename="tasklist"
        active={taskPage === "tasklist"}
        onClick={handleBtnClick}
        icon={<TaskListIcon />}
        description={"Task List"}
      />
      <SideBarButton
        onClick={firebase.signOut}
        icon={<ImportantIcon />}
        description={"Sign Out"}
      />

      <SideBarListsBox
        firebase={firebase}
        user={user}
        taskPage={taskPage}
        handleBtnClick={handleBtnClick}
      />
    </div>
  );
};

export default SideBar;
