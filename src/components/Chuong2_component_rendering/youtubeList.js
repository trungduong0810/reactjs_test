import React from "react";
import "../../style/reset.css";
import "../../style/youtubeList.css";
import data from "../../data/testData.js";

function Info(props) {
  return (
    <div className={`youtube__item ${props.className}`}>
      <img src={props.headerImg} alt="" className="header__img" />
      <div className="info">
        <img src={props.user} alt="" className="user" />
        <div className="post">
          <p className="author">{props.author}</p>
          <p className="header__desc">{props.desc}</p>
        </div>
      </div>
    </div>
  );
}

const Youtube = (props) => {
  return (
    <div>
    <h1 className="title">Chương 2: React cơ bản tìm hiểu về components và rendering</h1>
      <div className="youtube__list">
        {props.children}
        {data.map((item, index) => {
          let newClass = index === 1 ? "abc" : "";
          return (
            <Info
              key={item.id}
              headerImg={item.headerImage}
              user={item.userImage || item.headerImage}
              author={item.author || "Le Pham Trung Duong"}
              desc={item.desc}
              className={newClass}
            ></Info>
          );
        })}
      </div>
    </div>
  );
};

export default Youtube;
