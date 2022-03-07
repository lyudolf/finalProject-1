import './MenuBar.css';
import React, { useState } from 'react';

function MenuBar() {
  let [menu, menu1] = useState(['스터디모집', '국비교육', '게시판', '이벤트', '고객센터'])

  let [modal, modal1] = useState(false);

  return (
    <div className="MenuBar">
      {
        menu.map(function (a) {
          return <div className='menuNav'>
            <h3 onMouseOver={() => { modal1(!modal) }}>{a}</h3>

          </div>
        })
      }
      {
        modal === true
          ? <Modal />
          : null
      }
    </div>
  );
}
function Modal() {
  return (
    <div className="modal" >
      <ul className="study">
        <span><a href="#">스터디모집</a></span>
        <li><a href="#">간이테스트</a></li>
        <li><a href="#">지역별 검색</a></li>
        <li><a href="#">맞춤형 검색</a></li>
      </ul>
      <ul className="edu">
        <span ><a href="#">국비교육</a></span>
        <li><a href="#">기관검색</a></li>
      </ul>
      <ul className="board">
        <span><a href="#">게시판</a></span>
        <li><a href="#">리뷰게시판</a></li>
        <li><a href="#">고민상담게시판</a></li>
        <li><a href="#">최업준비게시판</a></li>
        <li><a href="#">IT게시판</a></li>
      </ul>
      <ul className="event">
        <span><a href="#">이벤트</a></span>
        <li><a href="#">코딩대회 일정</a></li>
        <li><a href="#">취업박람회 일정</a></li>
        <li><a href="#">심리테스트</a></li>
      </ul>
      <ul className="center">
        <span><a href="#">고객센터</a></span>
        <li><a href="#">공지사항</a></li>
        <li><a href="#">자주하는 질문</a></li>

      </ul>
    </div>
  )
}
export default MenuBar;
