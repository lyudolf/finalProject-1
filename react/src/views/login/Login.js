import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import LoginForm from "./LoginForm";
import axios from "../../plugins/axios";
import "./Login.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const login = () => {
    const data = { user: user, password: password };
    console.log(data);
    localStorage.setItem("user", data.user);

    // 벡엔드 연결되면 수정
    // axios.post("/member/login", data).then((response) => {
    //   if (response.data.error) {
    //     alert(response.data.error);
    //   } else {
    //     localStorage.setItem("user", response.data.user);
    //     console.log(response);
    //     navigate("/");
    //   }
    // });
  };

  return (
    <div className="loginContainer">
      <label>아이디: </label>
      <input
        autoFocus
        className="loginInput"
        type="text"
        name="id"
        onChange={(event) => setUser(event.target.value)}
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
    </div>
  );
}
export default Login;
