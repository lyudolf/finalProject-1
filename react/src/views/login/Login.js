import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../plugins/axios";
import "./Login.css";
import { Buffer } from 'buffer';
import kakao from "../../assets/kakao.png";

function Login() {
  const [loginId, setloginId] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const { Kakao } = window;
  
  const login = () => {

    const formData = new FormData();
    const data = { loginId, password };
    console.log(formData);
    console.log(password)
    axios.post("/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {

        //console.log(response.headers.get('Authorization'))
        console.log(response.data)
        const token = response.data;
        const please = token.split('.')[1]
        const payload = Buffer.from(please, 'base64');
        const result = JSON.parse(payload.toString());
        localStorage.setItem('result2', JSON.stringify(result));
        console.log(result);



        // token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;


        console.log(localStorage.getItem("hi"))
      }).catch((error) => {
        console.log(error);
      });
  };
  const kakaoLogin = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        //https://kauth.kakao.com/oauth/authorize?client_id=b57361b0269da06ba5b8bf17e32058f5&redirect_uri=http://localhost:8000/kakaologin&response_type=code
        fetch("https://kauth.kakao.com/oauth/authorize?client_id=b57361b0269da06ba5b8bf17e32058f5&redirect_uri=http://localhost:8000/kakaologin&response_type=code",
          {
            method: "POST",
            body: JSON.stringify({
              access_token: authObj.access_token,
            }),
          }
        )
          .then((res) => res.json())
          .then((res) => {
            localStorage.setItem("Kakao_token", res.access_token);
            if (res.access_token) {
              alert("환영합니다.");
              navigate("/");
            }
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <div className="loginContainer">
      <label>아이디: </label>
      <input
        autoFocus
        className="loginInput"
        type="text"
        name="id"
        onChange={(event) => setloginId(event.target.value)}
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
      <Link to="/login/find/id">
        <button className="loginBtn">ID/PW 찾기</button>
      </Link>
      <button onClick={kakaoLogin}>
        <img src={kakao} alt="kakao_button" />
      </button>
    </div>
  );
}
export default Login;