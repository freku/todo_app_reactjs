import React, { useState, useContext, useRef, useEffect } from "react";
import autosize from "autosize";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseContext } from "../../Firebase";
import { CheckIcon, CheckedIcon, StarFullIcon, StarIcon } from "../../icons";

const _ = {
  id: null,
  cooldown: (cb, cd) => {
    clearTimeout(_.id);
    _.id = setTimeout(cb, cd);
  },
};

const TaskNameButton = ({ task, allTasks, ...props }) => {
  const [editable, setEditable] = useState("");
  const firebase = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth);
  const area = useRef(null);

  useEffect(() => {
    autosize(area.current);
    setEditable(task.val().description);
  }, []);

  const onTextareaEdit = (e) => {
    const { value } = e.target;
    setEditable(value);

    _.cooldown(
      () =>
        firebase.updateTask(user.uid, task.key, {
          description: value,
        }),
      250
    );
  };

  const onImportantClick = (e) => {
    const data = task.val();
    const result = data.is_important === undefined ? true : !data.is_important;
    firebase.setTaskImportant(user.uid, task.key, result);
  };

  const onCheckClick = (e) => {
    const data = task.val();
    firebase.setTaskCheck(user.uid, task.key, !data.done);
  };

  return (
    <>
      {task && (
        <div className="button">
          <div onClick={onCheckClick} className="icon">
            {task.val().done ? <CheckedIcon /> : <CheckIcon />}
          </div>

          <div className="description with-area">
            <textarea
              ref={area}
              className="editable-title"
              value={editable}
              onChange={onTextareaEdit}
            />
          </div>
          <div onClick={(e) => onImportantClick(e)} className="special-icon">
            {task.val().is_important ? <StarFullIcon /> : <StarIcon />}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskNameButton;