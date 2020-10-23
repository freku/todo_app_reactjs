import React, { useState } from "react";
import SideBarButton from "./SideBarButton";
import { useList } from "react-firebase-hooks/database";

import { ReactComponent as AddTaskListIcon } from "../../icons/add_circle_outline-24px.svg";
import "./styles.css";

const SideBarListButton = (props) => {
  const { active, name, ...rest } = props;

  return (
    <div {...rest} className={`sidebar-button list-btn ${active ? "active" : ""}`}>
      <p className="sidebar-btn-desc">{name}</p>
    </div>
  );
};

const SideBarListsBox = (props) => {
  const { user, firebase, taskPage, handleBtnClick } = props;

  const [showListInput, setShowListInput] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [snapshots, loadingList, errorList] = useList(
    firebase.userListsRef(user.uid)
  );

  const handleSubmit = (e) => {
    firebase.createList(user.uid, newListName);
    document.getElementById("sacredInput").blur();
    e.preventDefault();
  };

  return (
    <>
      {errorList && <strong>Error: {errorList}</strong>}
      {loadingList && <span>List: Loading...</span>}
      {!loadingList && snapshots && (
        <>
          {snapshots.map((v) => (
            <SideBarListButton
              key={v.key}
              name={v.child("name").val()}
              pagename={v.key}
              active={taskPage === v.child("name").val()}
              onClick={(e) => handleBtnClick(e)}
            />
          ))}
        </>
      )}

      {showListInput && (
        <form onSubmit={(e) => handleSubmit(e)} className="sidebar-button">
          <input
            autoFocus
            id="sacredInput"
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
    </>
  );
};

export default SideBarListsBox;
