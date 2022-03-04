import React, { useEffect, useState } from "react";
import "./Main.css";
import { Link } from "react-router-dom";
import studyImg from "../assets/main/studyBeige.jpg";
import bootCampImg from "../assets/main/bootcamp.jpg";
import boardImg from "../assets/main/news.jpg";

function Main() {
  const [scrollY, setScrollY] = useState(0);

  const monitor = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", monitor);
    return () => {
      window.removeEventListener("scroll", monitor);
    };
  });

  useEffect(() => console.log(scrollY), [scrollY]);

  return (
    <div className="mainContainer">
      <div className="studyBg">
        <div className="studyLeft">
          <div className="studyText">
            <h1 className="studyTitle">스터디 모집</h1>
            <p className="studySubTitle">
              처음 시작한 코딩 공부, 어려우신가요? <br />
              스터디 그룹에 참여해보세요!
            </p>
            <button className="mainBtn">입장하기</button>
          </div>
        </div>
        <div className="studyRight">
          <img className="studyImg" src={studyImg}></img>
        </div>
      </div>

      <div className="bootCampBg">
        <div className="bootCampWrapper">
          <img className="bootCampImg" src={bootCampImg}></img>
          <div style={{ paddingTop: scrollY < 650 ? scrollY : 650 }}>
            <h1>국비교육</h1>
            <p>
              국비교육에 대한 정보를 찾고 계신가요? <br />
              아래버튼을 눌러보세요!
            </p>
            <button className="mainBtn">입장하기</button>
          </div>
        </div>
      </div>

      <div className="boardBg">
        <div className="boardLeft">
          <img
            className={`${
              scrollY > 480
                ? "boardImg animate__animated animate__slideInLeft animate__slow"
                : "boardImg"
            }`}
            src={boardImg}
          ></img>
        </div>
        <div
          className={`${
            scrollY > 480
              ? "boardRight animate__animated animate__slideInRight animate__slow"
              : "boardRight"
          }`}
        >
          <div className="boardText">
            <h1>게시판 Board</h1>
            <p>
              IT 뉴스, 취업준비, 고민상담등의 게시판입니다.
              <br />
              아래버튼을 누르시면 됩니다.
            </p>
            <button className="mainBtn">
              <Link to="/mainboard">입장하기</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
