import React, { useState } from "react";
import SideBarButton from "./SideBarButton";
import SideBarListsBox from "./SideBarListsBox";
import { useFirebaseWithUser } from "../../Firebase";
import MediaQuery, { useMediaQuery } from "react-responsive";

import {
  SunIcon,
  StarIcon,
  CalendarIcon,
  ListIcon,
  MenuIcon,
  LeaveIcon,
} from "../../icons";

import "./styles.css";

const SideBar = ({ taskPage, setTaskPage, setListName, listName }) => {
  const [focus, setFocus] = useState(false);
  const [firebase, user, loading, error] = useFirebaseWithUser();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleBtnClick = (e, name) => {
    setTaskPage(e.target.getAttribute("pagename") || "today");
    setListName(name || "");
  };

  return (
    <>
      <MediaQuery maxWidth={768}>
        <div className="mobile-bar">
          <MenuIcon onClick={() => setFocus(true)} />
          <p className="mb-title">{listName || taskPage || "Site"}</p>
        </div>
      </MediaQuery>

      <div
        className="sidebar"
        style={{ display: isMobile && !focus ? "none" : "block" }}
      >
        <SideBarButton
          onClick={handleBtnClick}
          pagename="today"
          active={taskPage === "today"}
          icon={<SunIcon />}
          description={"Today"}
        />
        <SideBarButton
          pagename="important"
          active={taskPage === "important"}
          onClick={handleBtnClick}
          icon={<StarIcon />}
          description={"Important"}
        />
        <SideBarButton
          pagename="planned"
          active={taskPage === "planned"}
          onClick={handleBtnClick}
          icon={<CalendarIcon />}
          description={"Planned"}
        />
        <SideBarButton
          pagename="tasklist"
          active={taskPage === "tasklist"}
          onClick={handleBtnClick}
          icon={<ListIcon />}
          description={"Task List"}
        />
        <SideBarButton
          onClick={firebase.signOut}
          icon={<LeaveIcon />}
          description={"Sign Out"}
        />

        <SideBarListsBox
          firebase={firebase}
          user={user}
          taskPage={taskPage}
          handleBtnClick={handleBtnClick}
        />
      </div>

      <MediaQuery maxWidth={768}>
        <div
          onClick={() => setFocus(false)}
          className={`sidebar-blured-bg ${focus ? "" : "deactive"}`}
        ></div>
      </MediaQuery>
    </>
  );
};

export default SideBar;
