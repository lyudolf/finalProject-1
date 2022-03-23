import React from "react";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs"; //qs라이브러리 사용 URL 쿼리 읽어오기
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const REST_API_KEY = "e9fdc52e3d35e33eb4ba5a732d2942ed";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const CLIENT_SECRET = "nxlK5TQicWSk8gmiXSc6MYXZBcXHQqNf";
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });
    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      
      // Kakao Javascript SDK 초기화
      window.Kakao.init(REST_API_KEY);
      console.log("초기화됐다")
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      navigate("/Profile");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return null;
};
export default Auth;
//redirect 주소로 전달받은 code 값을 추출하여 보여주는 코드