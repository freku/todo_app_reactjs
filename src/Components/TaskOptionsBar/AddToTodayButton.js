import React from "react";
import { SunIcon } from "../../icons";
import { useFirebaseWithUser } from "../../Firebase";

const AddToTodayButton = ({ currentTask, ...props }) => {
  const { is_today } = currentTask.val();
  const [firebase, user, loading, error] = useFirebaseWithUser();

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
      className="button align-center action-btn"
    >
      <div className="icon">
        <SunIcon style={{ fill: is_today ? "#1b97de" : "inherit" }} />
      </div>

      <div className="description">Add to Today</div>
    </div>
  );
};

export default AddToTodayButton;