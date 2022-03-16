import axios from 'axios'

// axios 인스턴스를 생성, 설정 정보 저장
const instance = axios.create({
    baseURL: 'http://localhost:8000/', //기본  루트 url 
    timeout: 15000,
    // withCredentials: true
});


instance.interceptors.request.use(
    function (config) {


        if (localStorage.hasOwnProperty("accessToken"))
            config.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");


        return config;
    },
    function (error) {

        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    function (response) {

        return response;
    },
    async function (error) {


        return Promise.reject(error);
    }
);

export default instance;
