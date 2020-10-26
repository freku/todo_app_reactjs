import React, {
  useState,
  forwardRef,
  useRef,
  useEffect,
  useContext,
} from "react";
import {
  SunIcon,
  CalendarIcon,
  CheckIcon,
  StarIcon,
  StarFullIcon,
  CheckedIcon,
  RemoveIcon,
} from "../../icons";
import autosize from "autosize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { FirebaseContext } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
    props.hideCall();
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

const SetDeadLineButton = ({ currentTask, ...props }) => {
  const [startDate, setStartDate] = useState(new Date());
  const firebase = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth);
  const { deadline: is_planned } = currentTask.val();

  const CInput = forwardRef((props, ref) => (
    <div className="" onClick={props.onClick}>
      <p style={{ color: is_planned ? "#1b97de" : "inherit" }}>Set Dead Line</p>
      {/* {props.value} */}
    </div>
  ));

  const onDateChange = (date) => {
    firebase.setTaskDeadline(user.uid, currentTask.key, date.getTime());
  };

  const cancelDeadLine = (e) => {
    firebase.removeTashDeadline(user.uid, currentTask.key);
    props.hideCall();
  };

  return (
    <div className="button align-center">
      <div className="icon">
        <CalendarIcon />
      </div>
      <DatePicker
        selected={currentTask.val().deadline || startDate}
        minDate={new Date()}
        onChange={(date) => onDateChange(date)}
        customInput={<CInput />}
        showDisabledMonthNavigation
      />
      <div style={{ textAlign: "right", flex: "1" }}>
        <RemoveIcon onClick={cancelDeadLine} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};

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

          <div className="description">
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

export { TaskNameButton, AddToTodayButton, SetDeadLineButton };
