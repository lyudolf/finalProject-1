import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../plugins/axios";
import "./ForgetId.css";

function ResultId() {
  const params = useParams();
  const foundId = params.uid;

  return (
    <div className="mainBody">
      <div className="container">
        <div className="heading">아이디 찾기</div>
        <hr></hr>
        <div className="content">
          <div className="contentHeader">아이디 찾기 결과 </div>
          <hr />
          <form className="searchForm">
            <div className="contentHeader">
              회원가입시 사용하신 아이디는" {foundId} "입니다.
            </div>
            <div>
              <Link to="/find/ps">
                <button type="button" className="loginBtn">
                  비밀번호 찾기
                </button>
              </Link>
            </div>
            <div>
              <Link to="/">
                <button type="button" className="loginBtn">
                  로그인 화면으로 돌아가기
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResultId;
