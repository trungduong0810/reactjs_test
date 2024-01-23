import React, { useReducer } from "react";
import "./style/count.css";
//todo: ========== useReducer =========
//1. init state: 0 (gia tri khoi tao = 0)
//2. Action: up(state + 1) down(state - 1)
//3. Reducer
//4. Dispatch

//? 1. init state
const initState = 0;
//? 2. action
const Up_Action = "up";
const Down_Action = "down";
//? 3. reducer
const reducer = (state, action) => {
  switch (action) {
    case Up_Action:
      return state + 1;
    case Down_Action:
      return state - 1;
    default:
      throw new Error("Invalid action");
  }
};

const Count = () => {
  const [count, dispatch] = useReducer(reducer, initState);
  return (
    <div>
      <div className="wrapper__count">
        <h1 className="count">{count}</h1>
        <div className="count__action">
          <button className="btn count_down" onClick={() => dispatch(Up_Action)}>+</button>
          <button className="btn count_up" onClick={() => dispatch(Down_Action)}>-</button>
        </div>
      </div>
    </div>
  );
};

export default Count;
