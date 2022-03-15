import axios from 'axios'

// axios 인스턴스를 생성, 설정 정보 저장
const instance = axios.create({
    baseURL: 'http://localhost:8000/', //기본  루트 url 
    timeout: 15000,
    withCredentials: true
});


instance.interceptors.request.use(
    function (config) {

        config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDcyNjU0MzcsImV4cCI6MTY0OTg1NzQzNywic3ViIjp7InBhc3N3b3JkIjpudWxsLCJ1c2VybmFtZSI6ImxvZ2luaWQxIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiYWNjb3VudE5vbkV4cGlyZWQiOnRydWUsImFjY291bnROb25Mb2NrZWQiOnRydWUsImNyZWRlbnRpYWxzTm9uRXhwaXJlZCI6dHJ1ZSwiZW5hYmxlZCI6dHJ1ZSwibG9naW5JZCI6ImxvZ2luaWQxIiwic29jaWFsIjpmYWxzZSwibmlja25hbWUiOiLri4nrhKTsnoQxIiwiZW1haWwiOiIxYWFhQGFhYS5jb20ifX0.CjtumJ73EWPSs20etVBpuuaKydnwBFjZVxSHs4rnJTs";
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    async function (error) {
        // Do something with response error

        return Promise.reject(error);
    }
);

export default instance;
