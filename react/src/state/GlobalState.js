// import axios from "../../plugins/axios";
// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ props }) => {
//   const [user, setUser] = useState({ nickname: "닉네임51" });

//   const login = ({ user, password }) => {
//     const data = { user: user, password: password };
//     console.log(data);
//     localStorage.setItem("user", data.user);
//   };

//   if(localStorage.getItem("token") ){

//     const token = localStorage.getItem("token");
//     axios.post("/api/verifyToken(벡엔드 주소",token).then((response)=>{
//     setUser(  response.data.user);
//     }).catch(e=>{
//       //다시 로그인 해주세요
//     })
//   }else{
//     //로그인페이지로 이동
//   }

//   return (
//     <AuthContext.Provider value={{ user, login }}>{props}</AuthContext.Provider>
//   );
// };
