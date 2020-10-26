import React, { useState, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SunIcon } from "../../icons";
import { FirebaseContext } from "../../Firebase";

const AddToTodayButton = ({ currentTask, ...props }) => {
  const { is_today } = currentTask.val();
  const firebase = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth);

  const onTodayClick = (e) => {
    firebase.setTaskToday(
      user.uid,
      currentTask.key,
      is_today ? !is_today : true
    );
    if (is_today) {
      props.hideCall();
    }
  };

  return (
    <div
      onClick={onTodayClick}
      style={{ color: is_today ? "#1b97de" : "inherit" }}
      className="button align-center"
    >
      <div className="icon">
        <SunIcon />
      </div>

      <div className="description">Add to Today</div>
    </div>
  );
};

export default AddToTodayButton;