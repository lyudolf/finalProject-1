import axios from 'axios'
import useStore from "../plugins/store";

// axios 인스턴스를 생성, 설정 정보 저장
const instance = axios.create({
    baseURL: 'http://localhost:8000/', //기본  루트 url 
    timeout: 15000,
    // withCredentials: true
});


// instance.interceptors.request.use(
//     function (config) {


//         if (localStorage.hasOwnProperty("accessToken")) {

//             config.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
//         }


//         return config;
//     },
//     function (error) {

//         return Promise.reject(error);
//     }
// );


// instance.interceptors.response.use(
//     function (response) {

//         return response;
//     },
//     async function (error) {

//         console.log(error);
//         console.log(error.response);
//         if (error.response.status === 403) {
//             console.log(error.response);

//             // 리프레쉬토큰으로 엑세스 토큰 재발급 요청?

//         }

//         //요청과 함께 보낸 엑세스 토큰에 문제가 있을시 (만료,인증불가) 발생하는 '유효성오류'에러를 받으면

//         //리프레쉬 토큰과 지난 액세스토큰을 보내서 조작여부확인 후 액세스토큰 재발행 요청 보내기. 

//         //서버에서 db에 저장된 리프레쉬 토큰과 비교 확인후 기간이 지나지않았으면 액세스 토큰 발급

//         //


//         return Promise.reject(error);
//     }
// );

export default instance;


//토큰이 유효하지 않을 때
// code: "403"
// message: "PLEASE CHECK TOKEN"
//==================================
//권한 없을시 에러 응답
// error: "Forbidden"
// message: "Forbidden"
// path: "/faq"
// status: 403
// timestamp: "2022-03-17T15:47:52.849+00:00"