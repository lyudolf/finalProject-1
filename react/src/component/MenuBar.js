import "./MenuBar.css";
import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";

function MenuBar() {
  return (
    <div className="menu">
      <ul>
        <li>
          <Link to="/together/study">스터디모집</Link>
          <ul>
            <li>
              <Link to="#">간이테스트</Link>
            </li>
            <li>
              <Link to="#">지역별 검색</Link>
            </li>
            <li>
              <Link to="#">맞춤형 검색</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/reviewmain">국비교육</Link>
          <ul>
            <li>
              <Link to="/reviewmain">기관검색</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/mainboard">게시판</Link>
          <ul>
            <li>
              <Link to="/reviewmain">리뷰게시판</Link>
            </li>
            <li>
              <Link to="#">고민상담게시판</Link>
            </li>
            <li>
              <Link to="/mainboard/career">취업준비게시판</Link>
            </li>
            <li>
              <Link to="/mainboard/technews">IT게시판</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="#">이벤트</Link>
          <ul>
            <li>
              <Link to="#">코딩대회 일정</Link>
            </li>
            <li>
              <Link to="#">취업박람회 일정</Link>
            </li>
            <li>
              <Link to="#">심리테스트</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/customer/faq">고객센터</Link>
          <ul>
            <li>
              <Link to="/customer/notice">공지사항</Link>
            </li>
            <li>
              <Link to="/customer/faq">자주하는 질문</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
export default MenuBar;
