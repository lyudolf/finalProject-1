import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div id="main">
        <div class="fof">
          <h1>404</h1>
          <p>
            찾을 수 없는 페이지 입니다. <br />
            요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요. :)
          </p>
          <div className="notFoundLinkWrapper">
            <Link className="loginBtn notFoundLink" to="/">
              홈으로 이동
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
