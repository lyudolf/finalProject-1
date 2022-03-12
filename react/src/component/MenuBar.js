
import "./MenuBar.css";
import React, { useState } from "react";


function MenuBar() {
  return (
    <div className="menu">
      <ul>
        <li><a href="#">스터디모집</a>
        <ul>
        <li><a href="#">간이테스트</a> </li>
        <li> <a href="#">지역별 검색</a></li>
        <li><a href="#">맞춤형 검색</a> </li>
        </ul>
        </li>
      
      
      <li> <a href="#">국비교육</a>
      <ul>
        <li> <a href="#">기관검색</a></li>
      </ul>
      </li>
      
        <li>
          <a href="#">게시판</a>
        <ul>
        <li><a href="#">리뷰게시판</a> </li>
        <li><a href="#">고민상담게시판</a></li>
        <li><a href="#">최업준비게시판</a></li>
        <li> <a href="#">IT게시판</a> </li>
        </ul>
    </li>
      
        <li>
          <a href="#">이벤트</a>
        <ul>
        <li><a href="#">코딩대회 일정</a> </li>
        <li> <a href="#">취업박람회 일정</a></li>
        <li> <a href="#">심리테스트</a> </li>
        </ul>
        </li>
      
      
        <li>
          <a href="#">고객센터</a>
        <ul>
        <li><a href="#">공지사항</a></li>
        <li><a href="#">자주하는 질문</a> </li>
        </ul>
     </li>
     </ul>
    </div>
  );
}
export default MenuBar;