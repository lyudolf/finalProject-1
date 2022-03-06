import React, { useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import chodaeLogo from "../assets/Chodae-logo.png";
import searchIcon from "../assets/search.png";

function Header() {
  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <div className="headerContainer">
      <div className="header">
        <div className="logoContainer">
          <Link to="/">
            <img className="chodaeLogo" src={chodaeLogo} alt=""></img>
          </Link>
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
        {/* 추후 수정 필요 */}
        {localStorage.getItem("user") ? (
          <nav className="headerItems">
            <Link className="headerLink" to="/signup">
              마이페이지
            </Link>
            <button className="headerLink" onClick={logout}>
              로그아웃
            </button>
          </nav>
        ) : (
          <nav className="headerItems">
            <Link className="headerLink" to="/login">
              로그인
            </Link>
            <Link className="headerLink" to="/signup">
              회원가입
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Header;
