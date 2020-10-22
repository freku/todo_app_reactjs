import React, { useState, forwardRef } from "react";
import SubTaskList from "../SubTasksList";
import { ReactComponent as CheckIcon } from "../../icons/crop_din-24px.svg";
import { ReactComponent as ImportantIcon } from "../../icons/grade-24px.svg";
import { ReactComponent as SunnyIcon } from "../../icons/wb_sunny-24px.svg";
import { ReactComponent as PlannedIcon } from "../../icons/event-24px.svg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./styles.css";

const AddToTodayButton = (props) => {
  return (
    <div className="button align-center">
      <div className="icon">
        <SunnyIcon />
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
    <div className='button align-center'>
      <div className="icon">
        <PlannedIcon />
      </div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<CInput />}
      />
    </div>
  );
};

const TaskNameButton = (props) => {
  return (
    <div className="button">
      <div className="icon">
        <CheckIcon />
      </div>

      <div className="description">
        <p>
          Nullam sodales urna consequat justo auctor, nec posuere justo pretium.
        </p>
      </div>
      <div className="special-icon">
        <ImportantIcon />
      </div>
    </div>
  );
};

const TaskOptionsBar = (props) => {
  return (
    <>
      <div className="blured-bg seen" onClick={props.hideCall}></div>

      <div className="task-options-bar">
        <TaskNameButton />
        <SubTaskList />

        <AddToTodayButton />
        <SetDeadLineButton />
      </div>
    </>
  );
};

export default TaskOptionsBar;
