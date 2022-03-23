import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../plugins/axios";
import styles from "./Forget.module.css";

function ResetCompleted() {
  return (
    <div className={styles.mainBody}>
      <div className={styles.container}>
        <div className={styles.heading}>비밀번호 찾기</div>
        <hr></hr>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            비밀번호 재설정을 완료했습니다.
          </div>
          <div className={styles.psContentWrapper}>
            로그인 화면으로 이동해서 다시 로그인 해주시기 바랍니다.
          </div>
          <hr />
          <form className={styles.searchForm}>
            <div className={styles.psGoBackBtnWrapper}>
              <Link to="/login">
                <button type="button" className={styles.loginBtn}>
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
