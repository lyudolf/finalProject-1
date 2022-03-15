import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewComment from './ReviewComment';



function Detail(props) {


  let { id } = useParams();
  // let title= props.shoes[id].title;

  // useParams 반환값은 객체 그 안에 url의 모든 파라미터 담겨있음
  // 그래서 destructuring을 사용해 변수에 담아줌
  // console.log(props.shoes);

  return (

    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={"https://github.com/9598dohyun/image/blob/main/academyphoto/photo" + [id] + ".png?raw=true"} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <ReviewComment id={id} />
        </div>
      </div>

    </div>

  );
}


export default Detail; 