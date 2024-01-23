import React, { useState } from "react";
// import "../../style/toggle.css";
import "./toggle.css"

const ToggleState = () => {
  const [on, setOn] = useState(false);
  const handleToggle = () => {
    setOn((active) => {
      return !active;
    });
  };
  return (
    <div>
      <h1 className="title">Chương 3: Tìm hiểu về react hook useState</h1>
      <div className={`toggle ${on ? "active" : ""}`} onClick={handleToggle}>
        <div className={`spinner ${on ? "active" : ""}`}></div>
      </div>
      <div className="control__toggle">
        <button className="toggle__on toggle__btn" onClick={() => setOn(true)}>
          On
        </button>
        <button className="toggle__of toggle__btn" onClick={() => setOn(false)}>
          Off
        </button>
      </div>
    </div>
  );
};

export default ToggleState;
