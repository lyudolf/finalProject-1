import React, { useState, useEffect } from "react";
import styles from "./Event.module.css";
import { images } from "../event/EventData";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Event() {
  const [currentImg, setCurrentImg] = useState(0);

  function loop(count) {
    if (count === images.length) {
      return (count = 0);
    }
    if (count < 0) {
      return (count = images.length - 1);
    }
    return count;
  }

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentImg((count) => loop(count + 1)),
      2000
    );
    return () => clearInterval(interval);
  });

  return (
    <div className={styles.eventContainer}>
      <div className={styles.eventImageContainer}>
        <div
          className={styles.eventInner}
          style={{ backgroundImage: `url(${images[currentImg].img})` }}
        >
          <div className={styles.eventBottom}></div>
          <div
            className={styles.left}
            onClick={() => {
              setCurrentImg((count) => loop(count - 1));
            }}
          >
            <IoIosArrowBack />
          </div>
          <div className={styles.center}>
            <div className={styles.eventTextWrapper}>
              <h1 className={styles.eventH1Tag}>{images[currentImg].title}</h1>
              <p className={styles.eventPTag}>{images[currentImg].subtitle}</p>
            </div>
          </div>
          <div
            className={styles.right}
            onClick={() => {
              setCurrentImg((count) => loop(count + 1));
            }}
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      <div className={styles.eventTableContainer}>
        <div className={styles.heading}>취업박람회 게시판</div>
        <table className={styles.eventTableDetails}>
          <thead>
            <tr className={styles.firstRowStyle}>
              <th style={{ width: "30%" }}>사진</th>
              <th colspan="2" style={{ width: "70%" }}>
                박람회 내용
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ textAlign: "left" }}>
              <td rowspan="2">
                <img
                  className={styles.eventImageSize}
                  src={images[0].img}
                  alt="jobFairImage"
                ></img>
              </td>
              <th>박람회</th>
              <td>{images[0].title}</td>
            </tr>
            <tr style={{ textAlign: "left" }}>
              <th>박람회 기간</th>
              <td>{images[0].subtitle}</td>
            </tr>
          </tbody>
          <tbody>
            <tr style={{ textAlign: "left" }}>
              <td rowspan="2">
                <img
                  className={styles.eventImageSize}
                  src={images[1].img}
                  alt="jobFairImage"
                ></img>
              </td>
              <th>박람회</th>
              <td>{images[1].title}</td>
            </tr>
            <tr style={{ textAlign: "left" }}>
              <th>박람회 기간</th>
              <td>{images[1].subtitle}</td>
            </tr>
          </tbody>
          <tbody>
            <tr style={{ textAlign: "left" }}>
              <td rowspan="2">
                <img
                  className={styles.eventImageSize}
                  src={images[2].img}
                  alt="jobFairImage"
                ></img>
              </td>
              <th>박람회</th>
              <td>{images[2].title}</td>
            </tr>
            <tr style={{ textAlign: "left" }}>
              <th>박람회 기간</th>
              <td>{images[2].subtitle}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Event;
