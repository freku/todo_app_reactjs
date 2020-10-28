import React, { useState, forwardRef } from "react";
import { CalendarIcon, RemoveIcon } from "../../icons";
import { useFirebaseWithUser } from "../../Firebase";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

const SetDeadLineButton = ({ currentTask, ...props }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [firebase, user, loading, error] = useFirebaseWithUser();
  const { deadline: is_planned } = currentTask.val();

  const CInput = forwardRef((props, ref) => (
    <div onClick={props.onClick}>
      <p
        style={{ color: is_planned ? "#1b97de" : "inherit", cursor: "pointer" }}
      >
        Set Dead Line
      </p>
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
        <CalendarIcon style={{ fill: is_planned ? "#1b97de" : "inherit" }} />
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
