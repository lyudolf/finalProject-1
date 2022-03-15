import React, { useEffect, useState, useContext } from "react";
import "./Main.css";
import { Link } from "react-router-dom";
import studyImg from "../assets/main/studyBeige.jpg";
import bootCampImg from "../assets/main/bootcamp.jpg";
import boardImg from "../assets/main/news.jpg";
// import { AuthContext } from "../state/GlobalState";

function Main() {
  const [scrollY, setScrollY] = useState(0);
  // const { user } = useContext(AuthContext);
  const monitor = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", monitor);
  });

  useEffect(() => console.log(scrollY), [scrollY]);

  return (
    <div className="mainContainer">
      <div className="studyBg">
        <div className="studyLeft">
          <div>
            <h1 className="studyTitle">스터디 모집</h1>
            <p className="studySubTitle">
              처음 시작한 코딩 공부, 어려우신가요? <br />
              스터디 그룹에 참여해보세요!
            </p>
            <Link to="/together/study">
              <button className="mainBtn">입장하기</button>
            </Link>
          </div>
        </div>
        <div className="studyRight">
          <img className="studyImg" src={studyImg}></img>
        </div>
      </div>

      <div className="bootCampBg">
        <div className="bootCampWrapper">
          <img className="bootCampImg" src={bootCampImg}></img>
          <div style={{ paddingTop: scrollY < 500 ? scrollY - 150 : 500 }}>
            <div className="bootCampText">
              <h1 style={{ margin: 0 }}>국비교육</h1>
              <p style={{ margin: 0 }}>
                국비교육에 대한 정보를 찾고 계신가요? <br />
                아래버튼을 눌러보세요!
              </p>
            </div>
            <button className="mainBtn">입장하기</button>
          </div>
        </div>
      </div>

      <div className="boardBg">
        <div className="boardLeft">
          <img
            className={`${scrollY > 480
              ? "boardImg animate__animated animate__slideInLeft animate__slow"
              : "boardImg"
              }`}
            src={boardImg}
          ></img>
        </div>
        <div
          className={`${scrollY > 480
            ? "boardRight animate__animated animate__slideInRight animate__slow"
            : "boardRight"
            }`}
        >
          <div className="boardText">
            <h1 className="studyTitle">게시판</h1>
            <p className="studySubTitle">
              IT 뉴스, 취업준비, 고민상담등의 게시판입니다.
              <br />
              아래버튼을 누르시면 됩니다.
            </p>
            <Link to="/mainboard/career">
              <button className="mainBtn">입장하기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
