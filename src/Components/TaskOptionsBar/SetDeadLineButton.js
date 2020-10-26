import React, { useState, forwardRef, useContext } from "react";
import { CalendarIcon, RemoveIcon } from "../../icons";
import { FirebaseContext } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

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
        {currentTask.val().deadline && (
          <RemoveIcon onClick={cancelDeadLine} style={{ cursor: "pointer" }} />
        )}
      </div>
    </div>
  );
};

export default SetDeadLineButton;
