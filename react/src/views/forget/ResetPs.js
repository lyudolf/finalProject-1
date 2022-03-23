import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../plugins/axios";
import styles from "./Forget.module.css";

function ResetPs() {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.uid;

  const [ps, setPs] = useState("");
  const [psMsg, setPsMsg] = useState("");
  const [isValidPs, setIsValidPs] = useState(false);
  const [ps2, setPs2] = useState("");
  const [psMsg2, setPsMsg2] = useState("");
  const [isValidPs2, setIsValidPs2] = useState(false);
  const [isSamePs, setIsSamePs] = useState(false);

  const onChangePs = (event) => {
    const value = event.target.value;
    const replaceValue = value.replace(/(\s*)/g, ""); //공백제거
    setPs(replaceValue);

    if (replaceValue.length === 0) {
      setPsMsg("");
      return;
    }
    //형식 체크
    const pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/; // 비밀번호는 8~20자 영문숫자 특수문자 혼합, 대소문자 구별
    // console.log(namePattern.test(replaceValue));
    if (pattern.test(replaceValue)) {
      setIsValidPs(true);
      setPsMsg("");
    } else {
      setIsValidPs(false);
      setPsMsg("비밀번호는 8~20글자로 영문,숫자,특수문자의 조합입니다.");
    }
  };

  const onChangePs2 = (event) => {
    const value = event.target.value;
    const replaceValue = value.replace(/(\s*)/g, ""); //공백제거
    setPs2(replaceValue);

    if (replaceValue.length === 0) {
      setPsMsg2("");
      return;
    }
    //형식 체크
    const pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    // console.log(namePattern.test(replaceValue));
    if (pattern.test(replaceValue)) {
      setIsValidPs2(true);
      setPsMsg2("");
    } else {
      setIsValidPs2(false);
      setPsMsg2("비밀번호는 8~20글자로 영문,숫자,특수문자의 조합입니다.");
    }
  };

  const submitForm = async function (event) {
    event.preventDefault();

    const pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    if (pattern.test(ps) && pattern.test(ps2)) {
      setIsValidPs(true);
      setIsValidPs2(true);
      setPsMsg("");
      setPsMsg2("");
    } else {
      setIsValidPs(false);
      setIsValidPs2(false);
      setPsMsg("비밀번호는 8~20글자로 영문,숫자,특수문자의 조합입니다.");
      setPsMsg2("비밀번호는 8~20글자로 영문,숫자,특수문자의 조합입니다.");
    }
    if (!isValidPs || !isValidPs2) {
      return;
    }
    // console.log(ps);
    // console.log(ps2);
    // console.log(isValidPs);
    // console.log(isValidPs2);

    if (!(ps === ps2)) {
      setIsSamePs(false);
      setPsMsg("비밀번호가 일치하지 않습니다.");
      setPsMsg2("비밀번호가 일치하지 않습니다.");
      // console.log(ps);
      // console.log(ps2);
      // console.log(isValidPs);
      // console.log(isValidPs2);
      return;
    } else {
      // console.log(userId);
      // console.log(ps);
      // 비밀번호 업데이트 호출로 수정해야함
      const formData = new FormData();
      formData.append("id", userId);
      formData.append("password", ps);

      await axios
        .put("/api/find/ps", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log(response.data);
          //성공시 재설정 결과화면 페이지로 이동, 업데이트 성공시 숫자1 반환
          if (response.data === 1) {
            navigate(`/find/ps/done`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={styles.mainBody}>
      <div className={styles.container}>
        <div className={styles.heading}>비밀번호 찾기</div>
        <hr></hr>
        <div className={styles.content}>
          <div className={styles.contentHeader}>비밀번호를 재설정하기</div>
          <div className={styles.psContentWrapper}>
            안전한 사용을 위해 기존 비밀번호를 바꿔주세요.
          </div>
          <hr />
          <form className={styles.searchForm}>
            <div className={styles.nameInput}>
              <input
                name="userName"
                className={styles.inputBox}
                onChange={onChangePs}
                placeholder="새로운 비밀번호를 입력해주세요."
              />
              {(!isValidPs || !isSamePs) && (
                <div className="errorMessage">{psMsg}</div>
              )}
            </div>
            <div className={styles.emailInput}>
              <input
                name="email"
                className={styles.inputBox}
                onChange={onChangePs2}
                placeholder="새로운 비밀번호를 다시 입력해주세요."
              />
              {(!isValidPs2 || !isSamePs) && (
                <div className={styles.errorMessage}>{psMsg2}</div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className={styles.loginBtn}
                onClick={submitForm}
              >
                재설정하기
              </button>
            </div>
            <div>
              <Link to="/">
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

export default ResetPs;
