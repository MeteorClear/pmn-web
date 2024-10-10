import axios from 'axios';

// axios 설정, api 호출 처리, jwt 토큰 처리

// axios 클라이언트 생성
const apiClient = axios.create({
    baseURL: 'https://localhost:8443/api'
});

// http 요청에 jwt 토큰 포함
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default apiClient;