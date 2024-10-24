import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import styles from './Login.module.css';

// 로그인 컴포넌트

interface JwtRequest {
    username: string;
    password: string;
};

interface LoginProps {
    onLogin: () => void;
    setEncodedUserPath: (path: string) => void;
}

const Login = ({ onLogin, setEncodedUserPath }: LoginProps) => {
    const [credentials, setCredentials] = useState<JwtRequest>({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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

    // form 변화에 따른 값 변화
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // 로그인 요청 (POST, /auth/login)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!credentials.username || !credentials.password) {
            setError('There are empty items');
            return;
        }

        try {
            // 로그인 시도
            const response = await apiClient.post('/auth/login', credentials);

            localStorage.setItem('token', response.data.token);

            // 로그인 성공 후 user 찾기
            const user = await getUserByUsername(credentials.username);
            
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userEmail', user.email);

            onLogin();

            setError(null);
            alert('login succeeded');

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

    const handleRegister = () => {
        navigate('/register');
    }

    const encodePath = (path: string) => {
        try {
            return btoa(path); // Base64
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