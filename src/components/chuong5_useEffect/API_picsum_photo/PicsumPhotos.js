import axios from "axios";
import React, { useEffect, useState } from "react";
const GetApiPhotos = async (page) => {
  try {
    const res = await axios.get(
      `https://picsum.photos/v2/list?page=${page}&limit=4`
    );
    const data = res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};

const Picsum_Photos = () => {
  const [photos, setPhoto] = useState([]);
  const [numPage, setNumPage] = useState(1);

  const handleLoadMore = async () => {
    const image = await GetApiPhotos(numPage);
    const newPhotos = [...photos, ...image];
    setPhoto(newPhotos);
    setNumPage(numPage + 1);
  };
  useEffect(() => {
    handleLoadMore();
  }, []);
  return (
    <div>
      <h1 className="text-center text-blue-300">PicSum Photos</h1>
      <div className="grid grid-cols-4 gap-5 p-5">
        {photos.map((item, index) => (
          <div key={index} className="p-5 bg-slate-100 rounded-lg h-[250px]">
            <img
              src={item.download_url}
              alt=""
              className="rounded-lg w-full h-full"
            />
          </div>
        ))}
      </div>
      <button
        className="block m-auto py-2 px-7 mb-12 bg-blue-950 text-white rounded-xl hover:bg-blue-900 transition-all"
        onClick={handleLoadMore}
      >
        Load more
      </button>
    </div>
  );
};

export default Picsum_Photos;
