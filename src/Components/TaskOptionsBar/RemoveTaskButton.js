import React, { useContext } from "react";
import { TrashBinIcon } from "../../icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseContext } from "../../Firebase";

const RemoveTaskButton = ({ currentTask, hideCall, ...props }) => {
  const firebase = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth);

  const onDeleteClick = (e) => {
    firebase.removeTask(user.uid, currentTask.key);

    hideCall();
  };

  return (
    <div onClick={onDeleteClick} className="button align-center">
      <div className="icon">
        <TrashBinIcon style={{fill: 'rgb(151, 3, 3)'}} />
      </div>

      <div className="description" style={{ color: "rgb(151, 3, 3)" }}>
        Delete task
      </div>
    </div>
  );
};

export default RemoveTaskButton;
