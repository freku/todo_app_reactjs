import React from "react";
import { SendIcon } from "../../icons";

const InputBox = ({ handleSubmit, inputVal, setInputVal, ...props }) => {
  return (
    <div className="input-box">
      <div className="icon">
        <SendIcon />
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexGrow: 1 }}>
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="task-input-el"
        />
      </form>
    </div>
  );
};

export default InputBox;
