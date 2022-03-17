/*eslint-disable */
import React, { useState } from "react";

import { Link } from "react-router-dom";
import "./ReviewMain.css";
import axios from "axios";

function ReviewMain(props) {
  let shoes = props.shoes;
  let shoes1 = props.shoes1;

  return (
    <div className="reviewmain">
      <div className="headline">
        <div className="heading">기관검색</div>
        <hr />
      </div>
      <div className="reviewmainContainer">
        <div className="row">
          {shoes.map((a, i) => {
            return <Card shoes={shoes[i]} i={i} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}
function Card(props) {
  return (
    <div className="eachcard">
      <button>
        <Link to={"/detail/" + props.i}>
          <img
            src={
              "https://github.com/9598dohyun/image/blob/main/academyphoto/photo" +
              props.i +
              ".png?raw=true"
            }
            width="100%"
            alt="이미지"
          ></img>
        </Link>
        <h4>{props.shoes.title}</h4>
      </button>
    </div>
  );
}
export default ReviewMain;
