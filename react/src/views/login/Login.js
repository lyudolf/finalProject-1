import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../plugins/axios";
import useStore from "../../plugins/store";
import jwt_decode from "jwt-decode";
import styles from "./Login.module.css";
import { Buffer } from "buffer";
import kakao from "../../assets/kakao.png";
import Auth from "./Auth";
import { BrowserRouter as Routes, Route } from "react-router-dom";

function Login() {
  const REST_API_KEY = "[본인 REST API KEY 값]";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=b57361b0269da06ba5b8bf17e32058f5&redirect_uri=http://localhost:8000/kakaologin&response_type=code`;
  const store = useStore();

  const [loginId, setloginId] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const login = () => {
    const formData = new FormData();
    formData.append("loginId", loginId);
    formData.append("password", password);

    axios
      .post("/api/login", formData)
      .then((response) => {
        console.log(response.data);
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const dt = jwt_decode(accessToken);

        store.setMemberInfo(dt.member);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("username", useStore.getState().member.nickname); //임시

        console.log(
          "useStore.getState().member.nickname",
          useStore.getState().member.nickname
        );
        console.log("useStore.getState().member", useStore.getState().member);
        console.log(dt);
        console.log(dt.member);

        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.loginContainer}>
      <label>아이디: </label>
      <input
        autoFocus
        className={styles.loginInput}
        type="text"
        name="id"
        onChange={(event) => setloginId(event.target.value)}
      ></input>

      <label>비밀번호: </label>
      <input
        className={styles.loginInput}
        type="password"
        name="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      ></input>
      <button className={styles.loginBtn} onClick={login}>
        로그인
      </button>
      <Link to="/find/id">
        <button className={styles.loginBtn}>ID/PW 찾기</button>
      </Link>
      {/* <button onClick={kakaoLogin}>
        <img src={kakao} alt="kakao_button" />
      </button> */}

      {/* <Routes>
          <Route path="/" exact element={KAKAO_AUTH_URL}></Route>
            <h1><a href={KAKAO_AUTH_URL}>Kakao Login</a></h1>
          <Route path="/oauth/kakao/callback" exact element={<Auth/>}></Route>
      </Routes> */}
    </div>
  );
}
export default Login;
