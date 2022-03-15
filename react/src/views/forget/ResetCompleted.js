import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../plugins/axios";
import "./ForgetId.css";

function ResetCompleted() {
  return (
    <div className="mainBody">
      <div className="container">
        <div className="heading">비밀번호 찾기</div>
        <hr></hr>
        <div className="content">
          <div className="contentHeader">비밀번호 재설정을 완료했습니다.</div>
          <div className="contentHeader psContentWrapper">
            로그인 화면으로 이동해서 다시 로그인 해주시기 바랍니다.
          </div>
          <hr />
          <form className="searchForm">
            <div className="psGoBackBtnWrapper">
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

export default ResetCompleted;
