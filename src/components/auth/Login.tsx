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
}

const Login = ({ onLogin }: LoginProps) => {
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

        try {
            // 로그인 시도
            const response = await apiClient.post('/auth/login', credentials);

            localStorage.setItem('token', response.data.token);

            // 로그인 성공 후 user 찾기
            const user = await getUserByUsername(credentials.username);
            
            localStorage.setItem('userId', user.id);

            onLogin();

            setError(null);
            alert('login succeeded');
        } catch (error_) {
            console.error("DEBUG::Login.tsx::", error_);
            setError('login failed');
        }
    };

    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <button type="submit">Login</button>
                </form>
                {error && <p>{error}</p>}
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
};

export default Login;