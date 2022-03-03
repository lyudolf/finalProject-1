import axios from 'axios'

// axios 인스턴스를 생성, 설정 정보 저장
const instance = axios.create({
    baseURL: 'http://localhost:8000/', //기본  루트 url 
    timeout: 3000
});

export default instance;