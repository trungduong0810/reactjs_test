import axios from "axios";
import React, { useEffect, useReducer, useRef } from "react";
import lodash from "lodash";

// 1. init state: 0 (gia tri khoi tao = 0)
// 2. Action: up(state + 1) down(state - 1)
// 3. Reducer
// 4. Dispatch

const initState = {
  url: "",
  query: "",
  loading: true,
  dataShow: [],
  error: "",
};

//todo 2: action
const SET_QUERY = "setQuery";
const SET_URL = "setUrl";
const SET_DATA_SHOW = "setDataShow";
const SET_LOADING = "setLoading";
const SET_ERROR = "setError";

const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};
const setQuery = (payload) => {
  return {
    type: SET_QUERY,
    payload,
  };
};
const setUrl = (payload) => {
  return {
    type: SET_URL,
    payload,
  };
};
const setDataShow = (payload) => {
  return {
    type: SET_DATA_SHOW,
    payload,
  };
};
const setError = (payload) => {
  return {
    type: SET_ERROR,
    payload,
  };
};
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case SET_QUERY:
      newState = {
        ...state,
        query: action.payload,
      };
      break;
    //todo: ==============

    case SET_URL:
      newState = {
        ...state,
        url: action.payload,
      };
      break;
    //todo: ==============

    case SET_DATA_SHOW:
      newState = {
        ...state,
        dataShow: action.payload,
      };
      break;

    //todo: ==============

    case SET_LOADING:
      newState = {
        ...state,
        loading: action.payload,
      };
      break;

    //todo: ==============
    case SET_ERROR:
      newState = {
        ...state,
        error: action.payload,
      };
      break;
    default:
      break;
  }
  return newState;
};

const HackNewsWithReducer = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { url, query, loading, dataShow, error } = state;

  const handleDataApi = useRef({});
  handleDataApi.current = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(url);
      const dataApi = response.data.hits;
      dispatch(setDataShow(dataApi));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(`Error happen: ${error}`));
    }
  };
  useEffect(() => {
    handleDataApi.current();
  }, [url]);

  useEffect(() => {}, [dataShow]);

  console.log(error);
  console.log(query);

  return (
    <div className="wrapper p-12 w-[70%] bg-gray-100  mx-auto my-12  rounded-xl">
      <div className="query flex items-center justify-center gap-x-3">
        <input
          type="text"
          name="find__value"
          defaultValue={query}
          onChange={lodash.debounce(
            (e) => dispatch(setQuery(e.target.value)),
            500
          )}
          className="border outline-none focus:border-red-500 h-[50px] px-3 py-2 w-[60%] text-lg rounded-lg"
          placeholder="Enter"
        />
        <div
          onClick={() => {
            dispatch(
              setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
            );
            
          }}
          className="cursor-pointer leading-[50px] px-5 font-bold text-white hover:opacity-[0.8] transition-all bg-blue-800 rounded-xl h-[50px]"
        >
          Fetching
        </div>
      </div>
      {loading && (
        <div
          className="loading w-10 h-10 border-blue-500 rounded-full border-4 border-r-4
      border-r-transparent animate-spin text-center mt-12 block mx-auto"
        ></div>
      )}

      <div className="content flex flex-wrap items-center justify-center  gap-3 mt-10">
        {error && (
          <h1 className="text-red-700 font-bold text-[30px]">
            AxiosError: Network Error
          </h1>
        )}

        {!loading &&
          dataShow &&
          dataShow.map((item, index) => (
            <p
              key={index}
              className="inline-block  p-3 bg-red-100 rounded-lg text-lg"
            >
              {item.title}
            </p>
          ))}
      </div>
    </div>
  );
};

export default HackNewsWithReducer;
