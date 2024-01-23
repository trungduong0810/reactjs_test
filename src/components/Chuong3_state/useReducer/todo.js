import React, { useReducer, useRef } from "react";

//todo: 1. init state
const initState = {
  job: "",
  jobs: [],
};

//todo: 2. action
const SET_JOB = "set_job";
const ADD_JOB = "add_Job";
const DELETE_JOB = "delete_Job";

const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};

const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};

const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};

//todo: 3. reducer
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case SET_JOB:
      newState = {
        ...state,
        job: action.payload,
      };
      break;
    case ADD_JOB:
      console.log(action.payload);

      newState = {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
      break;
    case DELETE_JOB:
      const newJob = [...state.jobs];
      newJob.splice(action.payload, 1);
      newState = {
        ...state,
        jobs: newJob,
      };

      break;

    default:
      throw new Error("Invalid action.");
  }
  return newState;
};
const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { job, jobs } = state;
  const inputRef = useRef();
  const handleAddJob = () => {
    dispatch(addJob(job));
    dispatch(setJob(""));
    inputRef.current.focus();
  };

  return (
    <div>
      <div className="wrapper__todo">
        <div className="form__input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter..."
            value={job}
            onChange={(e) => dispatch(setJob(e.target.value))}
          />
          <button className="btn todo__add" onClick={handleAddJob}>
            Add
          </button>
        </div>
        <div className="content">
          <ul>
            {jobs.map((item, index) => (
              <li key={index}>
                {item}
                <span onClick={() => dispatch(deleteJob(index))}>delete</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
