import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import kakao from "../../assets/kakao.png";
// import LoginForm from "./LoginForm";
import axios from "../../plugins/axios";
import "./Login.css";

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = { username: username, password: password };
    console.log(data);
    localStorage.setItem("username", data.username);
    navigate(-1);
  };

  // let navigate = useNavigate();
  // const { Kakao } = window;

  // const login = () => {
  //   axios
  //     .post("/login", {
  //       params: {
  //         username: "username",
  //         password: "password",
  //       },
  //     })
  //     .then((response) => {
  //       localStorage.setItem("username", response.data.user);
  //       console.log(response);
  //       navigate("/");
  //     })
  //     .catch((error) => console.log(error.message));
  // };

  // const kakaoLogin = () => {
  //   Kakao.Auth.login({
  //     success: function (authObj) {
  //       fetch(
  //         `https://kauth.kakao.com/oauth/authorize?client_id=b57361b0269da06ba5b8bf17e32058f5&redirect_uri=http://localhost:3000/login&response_type=code`,
  //         {
  //           method: "POST",
  //           body: JSON.stringify({
  //             access_token: authObj.access_token,
  //           }),
  //         }
  //       )
  //         .then((res) => res.json())
  //         .then((res) => {
  //           localStorage.setItem("Kakao_token", res.access_token);
  //           if (res.access_token) {
  //             alert("환영합니다.");
  //             navigate("/");
  //           }
  //         });
  //     },
  //     fail: function (err) {
  //       alert(JSON.stringify(err));
  //     },
  //   });
  // };

  // console.log("kakao 로그인");
  // router.push({
  //   pathname: "https://kauth.kakao.com/oauth/authorize",
  //   query: {
  //     response_type: "code",
  //     client_id: "b57361b0269da06ba5b8bf17e32058f5",
  //     redirect_url: "http://localhost:3000/kakaologin",
  //   },
  // });

  return (
    <div className="loginContainer">
      <label>아이디: </label>
      <input
        autoFocus
        className="loginInput"
        type="text"
        name="id"
        onChange={(event) => setUsername(event.target.value)}
      ></input>

      <label>비밀번호: </label>
      <input
        className="loginInput"
        type="password"
        name="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      ></input>
      <button className="loginBtn" onClick={login}>
        로그인
      </button>
      <Link to="/find/id">
        <button className="loginBtn">ID/PW 찾기</button>
      </Link>
      {/* <button onClick={kakaoLogin}>
        <img src={kakao} alt="kakao_button" />
      </button> */}
    </div>
  );
}
export default Login;
