import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import styles from './Login.module.css';

/**
 * JWT 요청에 필요한 필드 정의.
 * 
 * @property {string} username 사용자 이름.
 * @property {string} password 사용자 비밀번호.
 */
interface JwtRequest {
    username: string;
    password: string;
};

/**
 * Login 컴포넌트의 props 정의.
 * 
 * @property {function} onLogin 로그인 성공여부 설정 함수.
 * @property {function} setEncodedUserPath 인코딩된 사용자 경로 설정 함수.
 */
interface LoginProps {
    onLogin: () => void;
    setEncodedUserPath: (path: string) => void;
}

/**
 * 로그인 컴포넌트.
 * 로그인 요청과 처리 담당.
 * 
 * @component
 * @param {LoginProps} props 컴포넌트에 전달되는 props.
 * @returns {JSX.Element} Login 컴포넌트.
 */
const Login = ({ onLogin, setEncodedUserPath }: LoginProps) => {
    const [credentials, setCredentials] = useState<JwtRequest>({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    /**
     * username으로 사용자 정보를 가져오는 함수.
     * 
     * @async
     * @function
     * @param {string} email 사용자의 이메일 주소(로그인시 사용한 username).
     * @returns 사용자 데이터 객체.
     * @throws 요청 실패 시 에러.
     */
    const getUserByUsername = async (email: string) => {
        try {
            const response = await apiClient.get(`/users/email`, {
                params: { email }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    /**
     * 입력 필드의 값이 변경될 때 상태 업데이트 함수.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e 입력 이벤트.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    /**
     * 로그인 요청 처리 함수.
     * '/auth/login' 에 post 요청.
     * 성공시 메인 페이지로 이동.
     * 
     * @async
     * @function
     */
    const handleSubmit = async () => {
        if (!credentials.username || !credentials.password) {
            setError('There are empty items');
            return;
        }

        try {
            const response = await apiClient.post('/auth/login', credentials);
            localStorage.setItem('token', response.data.token);

            const user = await getUserByUsername(credentials.username);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userEmail', user.email);

            onLogin();
            setError(null);
            alert('login succeeded');

            // App.tsx 사용자 Email을 기반으로 사용자 주소 설정.
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                const encodedUserPath = encodePath(userEmail);
                setEncodedUserPath(encodedUserPath);
                navigate(`/${encodedUserPath}`);
            } else {
                setError('main page load failed');
            }

        } catch (error_) {
            console.error("DEBUG::Login.tsx::", error_);
            setError('login failed');
        }
    };

    /**
     * 회원가입 페이지로 이동하는 함수.
     */
    const handleRegister = () => {
        navigate('/register');
    }

    /**
     * 문자열을 Base64로 인코딩하는 함수.
     * 
     * @function
     * @param {string} path 인코딩할 문자열.
     * @returns {string} 인코딩된 문자열.
     */
    const encodePath = (path: string) => {
        try {
            return btoa(path);
        } catch (error) {
            return path;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <p className={styles.title}>Project MN Login</p>
                <p className={styles.inputPlaceholder}>Email</p>
                <input
                    className={styles.inputBox}
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                />
                <p className={styles.inputPlaceholder}>Password</p>
                <input
                    className={styles.inputBox}
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                {error && <p className={styles.error}>{error}</p>}
                <button className={styles.button} onClick={handleSubmit}>Login</button>
                <button className={styles.button} onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
};

export default Login;