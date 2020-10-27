import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../Firebase";
import { AddIcon, LoadingCircleIcon } from "../../icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useList } from "react-firebase-hooks/database";
import SubTask from "./SubTask";

import "./styles.css";

const styles = {
  optsInput: {
    display: "flex",
    justifyContent: "center",
    padding: 10,
  },
};

const SubTasksList = ({ currentTask, ...props }) => {
  const [newSubTaskName, setNewSubTaskName] = useState("");
  const [showListInput, setShowListInput] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth);
  const [snapshots, loadingList, errorList] = useList(
    firebase.userTasksRef(user.uid).child(`${currentTask.key}/subtasks`)
  );

  const handleSubmit = (e) => {
    firebase.addSubtaskToTask(user.uid, currentTask.key, newSubTaskName);
    document.getElementById("subtaskInput").blur();

    e.preventDefault();
  };

  const handleRemoveClick = (e, subtaskID) => {
    firebase.removeSubtask(user.uid, currentTask.key, subtaskID);
  };

  return (
    <div className="sub-tasks-list">
      {loadingList && <LoadingCircleIcon className="subtask-loading" />}
      {!loadingList && snapshots && (
        <>
          {snapshots.map((v, i) => (
            <SubTask
              data={v.val()}
              key={i}
              handleRemoveClick={handleRemoveClick}
              subtaskID={v.key}
              firebase={firebase}
              user={user}
              currentTask={currentTask}
            />
          ))}
        </>
      )}

      {showListInput && (
        <form onSubmit={(e) => handleSubmit(e)} style={styles.optsInput}>
          <input
            autoFocus
            id="subtaskInput"
            onBlur={() => setShowListInput(false)}
            onChange={(e) => setNewSubTaskName(e.target.value)}
          />
        </form>
      )}

      <div className="add-sub-task" onClick={() => setShowListInput(true)}>
        <div className="add-icon">
          <AddIcon />
        </div>

        <p>Add subtask</p>
      </div>
    </div>
  );
};

export default SubTasksList;

export { SubTask };
