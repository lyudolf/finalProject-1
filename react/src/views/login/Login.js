import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import kakao from "../../assets/kakao.png";
// import LoginForm from "./LoginForm";
import axios from "../../plugins/axios";
import useStore from "../../plugins/store";
import jwt_decode from 'jwt-decode'


import "./Login.css";

function Login() {

  const store = useStore();

  const [loginId, setloginId] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const login = () => {

    // store.login(loginId, password);
    // console.log(useStore.getState().member);


    const formData = new FormData();
    formData.append("loginId", loginId);
    formData.append("password", password);


    axios.post("/api/login", formData)
      .then((response) => {
        console.log(response.data);
        const token = response.data;
        const dt = jwt_decode(token);

        store.setMemberInfo(dt.member);

        localStorage.setItem("accessToken", response.data);
        localStorage.setItem("username", useStore.getState().member.nickname); //임시

        console.log("useStore.getState().member.nickname", useStore.getState().member.nickname);
        console.log("useStore.getState().member", useStore.getState().member);
        console.log(dt);
        console.log(dt.member);

        navigate(-1);

      }).catch((error) => {
        console.log(error);
      });
  };





  // const data = { loginId: loginId, password: password };
  // console.log(data);

  // const formData = new FormData();
  // formData.append("loginId", loginId);
  // formData.append("password", password);

  // axios.post("/api/login", formData)
  //   .then((response) => {

  //     //console.log(response.headers.get('Authorization'))
  //     console.log(response.data)
  //     const token = response.data;

  //     // localStorage.setItem("username", data.username);

  //     // const please = token.split('.')[1]
  //     // const payload = Buffer.from(please, 'base64');
  //     // const result = JSON.parse(payload.toString());
  //     // localStorage.setItem('result2', JSON.stringify(result));
  //     // console.log(result);



  //     // token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
  //     // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

  //     // console.log(localStorage.getItem("hi"))

  //   }).catch((error) => {
  //     console.log(error);
  //   });


  // const login = () => {
  //   const data = { username: username, password: password };
  //   console.log(data);
  //   // navigate(-1);
  // };

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
