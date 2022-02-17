import React from "react";
import "./Header.css";
import chodaeLogo from "../assets/Chodae-logo.png";
import searchIcon from "../assets/search.png";

function Header() {
  return (
    <div className="header">
      <div className="logoContainer">
        <img className="chodaeLogo" src={chodaeLogo} alt=""></img>
      </div>

      <div className="searchBar">
        <div className="searchIconContainer">
          <img src={searchIcon} alt=""></img>
        </div>
        <input
          className="searchInput"
          placeholder="검색어를 입력해주세요"
        ></input>
      </div>

      <div className="headerItems">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </div>
  );
}

export default Header;
