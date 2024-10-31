import axios from 'axios';

/**
 * Axios 설정 및 API 호출을 위한 클라이언트.
 * JWT 토큰을 포함한 요청 처리를 담당.
 */

// Axios 클라이언트 생성
const apiClient = axios.create({
    baseURL: 'https://localhost:8443/api'
});

// HTTP 요청 시 JWT 토큰을 자동으로 포함하는 인터셉터
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default apiClient;