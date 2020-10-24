import React, { useState } from "react";
import SideBarButton from "./SideBarButton";
import { useList } from "react-firebase-hooks/database";
import { useMediaQuery } from "react-responsive";

import {
  AddIcon as AddTaskListIcon,
  LoadingCircleIcon,
  RemoveIcon,
  ListButtonIcon,
} from "../../icons";
import "./styles.css";

const SideBarListButton = ({ active, name, onClickDelete, ...props }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [hover, setHover] = useState(false);

  return (
    <div
      {...props}
      onMouseEnter={(e) => setHover(1)}
      onMouseLeave={(e) => setHover(0)}
      className={`list-btn ${active ? "active" : ""}`}
    >
      <ListButtonIcon />
      <p className="sidebar-btn-desc">{name}</p>
      {isMobile && <RemoveIcon onClick={onClickDelete} />}
      {!isMobile && (
        <RemoveIcon
          onClick={onClickDelete}
          style={{ visibility: hover ? "visible" : "hidden" }}
        />
      )}
    </div>
  );
};

const SideBarListsBox = ({
  user,
  firebase,
  taskPage,
  handleBtnClick,
  ...props
}) => {
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

  const onClickDelete = (e, key) => {
    firebase.deleteList(user.uid, key);
  };

  return (
    <>
      {errorList && <strong>Error: {errorList}</strong>}
      {loadingList && <LoadingCircleIcon className="subtask-loading" />}
      {!loadingList && snapshots && (
        <>
          {snapshots.map((v) => (
            <SideBarListButton
              key={v.key}
              name={v.child("name").val()}
              pagename={v.key}
              active={taskPage === v.child("name").val()}
              onClick={(e) => handleBtnClick(e, v.child("name").val())}
              onClickDelete={(e) => onClickDelete(e, v.key)}
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
