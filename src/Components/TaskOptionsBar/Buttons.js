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
  CheckedIcon,
} from "../../icons";
import autosize from "autosize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { FirebaseContext } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AddToTodayButton = (props) => {
  return (
    <div className="button align-center">
      <div className="icon">
        <SunIcon />
      </div>

      <div className="description">Add to Today</div>
    </div>
  );
};

const SetDeadLineButton = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  const CInput = forwardRef((props, ref) => (
    <div className="" onClick={props.onClick}>
      <p>Set Dead Line</p>
      {/* {props.value} */}
    </div>
  ));
  return (
    <div className="button align-center">
      <div className="icon">
        <CalendarIcon />
      </div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<CInput />}
      />
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

const TaskNameButton = ({ task, ...props }) => {
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

  return (
    <div className="button">
      <div className="icon">
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
      <div className="special-icon">
        <StarIcon />
      </div>
    </div>
  );
};

export { TaskNameButton, AddToTodayButton, SetDeadLineButton };
