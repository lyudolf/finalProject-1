import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div id={styles.main}>
        <div class={styles.fof}>
          <h1>404</h1>
          <p>
            찾을 수 없는 페이지 입니다. <br />
            요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요. :)
          </p>
          <div className={styles.notFoundLinkWrapper}>
            <Link className={styles.notFoundLink} to="/">
              홈으로 이동
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
