import React, { useContext, useState } from "react";
import SideBarButton from "./SideBarButton";
import SideBarListsBox from "./SideBarListsBox";
import { FirebaseContext } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMediaQuery } from "react-responsive";

import {
  SunIcon,
  StarIcon,
  CalendarIcon,
  ListIcon,
  MenuIcon,
} from "../../icons";

import "./styles.css";

const SideBar = ({ taskPage, setTaskPage }) => {
  // const { taskPage, setTaskPage } = props;
  const [focus, setFocus] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const handleBtnClick = (e) => {
    setTaskPage(e.target.getAttribute("pagename"));
  };

  return (
    <>
      <div className="mobile-bar">
        <MenuIcon onClick={() => setFocus(true)} />
        <p className="mb-title">{taskPage}</p>
      </div>
      <div className="sidebar" style={{ display: focus ? "block" : "none" }}>
        {/* <SideBarButton description={taskPage} /> */}
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
          icon={<StarIcon />}
          description={"Sign Out"}
        />

        <SideBarListsBox
          firebase={firebase}
          user={user}
          taskPage={taskPage}
          handleBtnClick={handleBtnClick}
        />
      </div>
      <div
        onClick={() => setFocus(false)}
        className={`sidebar-blured-bg ${focus ? "" : "deactive"}`}
      ></div>
    </>
  );
};

export default SideBar;
