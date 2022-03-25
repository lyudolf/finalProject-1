import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReviewComment from "./ReviewComment.js";
import styles from "./Detail.module.css";

function Detail(props) {
  const [data, setdata] = useState("");
  let { id } = useParams();
  // let title= props.shoes[id].title;

  // useParams 반환값은 객체 그 안에 url의 모든 파라미터 담겨있음
  // 그래서 destructuring을 사용해 변수에 담아줌
  // console.log(props.shoes);
  return (
    
    <div className={styles.DetailCard}>
      <div className={styles.Card}>
        
          <img className={styles.detailImage} src={
              "https://github.com/9598dohyun/image/blob/main/academyphoto/photo" +
              [id] +  ".png?raw=true"
            }
          />
        
        <div className={styles.detailTableContainer}>
          <table className={styles.detailContent}>
            <tbody>
              <tr>
                <td>
                  <div className={styles.contentA}>
                    <h2>교육기관명: </h2>
                    <p>{props.shoes[id].title}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.contentA}>
                    <h2>기관위치: </h2>
                    <p>{props.shoes[id].place} </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.contentA}>
                    <h2>전화번호: </h2>
                    <p>{props.shoes[id].pNumber}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.contentA}>
                    <h2>운영강의: </h2>
                    <p>{props.shoes[id].class}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.contentA}>
                    <h2>URL: </h2>
                    <a href={props.shoes[id].address} target="_blank">
                      {props.shoes[id].address}
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.contentA}>
                    <h2>한줄 코멘트: </h2>
                    <p>{props.shoes[id].comment}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ReviewComment id={id} />
    </div>
  );
}

export default Detail;
