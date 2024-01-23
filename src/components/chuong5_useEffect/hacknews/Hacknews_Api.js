import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import lodash from "lodash";

const getApi = async (value) => {
  const response = await axios.get(
    `https://hn.algolia.com/api/v1/search?query=${value}`
  );
  const dataApi = await response.data.hits;
  return dataApi;
};

const Hacknews_Api = () => {
  const [titleHits, setTitleHist] = useState([]);
  const [query, setQuery] = useState("React js");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query=${query}`
  );

  const handleData = useRef({});
  handleData.current = async () => {
    setLoading(true);
    try {
      const data = await getApi(query);
      setTitleHist(data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`The error happen ${error}`);
    }
  };
  useEffect(() => {
    handleData.current();
  }, [url]);

  return (
    <div className="wrapper p-12 w-[70%] bg-gray-100  mx-auto my-12  rounded-xl">
      <div className="query flex items-center justify-center gap-x-3">
        <input
          type="text"
          name="find__value"
          id=""
          className="border outline-none focus:border-red-500 h-[50px] px-3 py-2 w-[60%] text-lg rounded-lg"
          defaultValue={query}
          z 
        />
        <div
          onClick={() => {
            setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
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

      {!loading && error && <p>{error}</p>}

      <div className="content flex flex-wrap items-center justify-center  gap-3 mt-10">
        {!loading &&
          titleHits.length > 0 &&
          titleHits.map((item, index) => {
            return (
              <p
                key={index}
                className="inline-block  p-3 bg-red-100 rounded-lg text-lg"
              >
                {item.title}
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default Hacknews_Api;
