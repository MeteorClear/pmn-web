import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import styles from './Register.module.css';

/**
 * 회원가입 요청에 필요한 필드 정의.
 * 
 * @property {string} email 사용자 이메일 주소.
 * @property {string} password 사용자 비밀번호.
 * @property {string} username 사용자 이름.
 */
interface UserRegisterRequest {
    email: string;
    password: string;
    username: string;
};

/**
 * 회원가입 컴포넌트.
 * 회원가입 요청과 처리 담당.
 * 
 * @component
 * @returns {JSX.Element} Register 컴포넌트.
 */
const Register = () => {
    const [user, setUser] = useState<UserRegisterRequest>({
        email: '',
        password: '',
        username: ''
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    /**
     * 입력 필드의 값이 변경될 때 상태 업데이트 함수.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e 입력 이벤트.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    /**
     * 회원가입 요청을 처리하는 함수.
     * '/users' 에 post 요청. 
     * 성공시 로그인 페이지로 이동.
     * 
     * @async
     */
    const handleSubmit = async () => {
        if (!user.email || !user.password || !user.username) {
            setError('There are empty items');
            return;
        }

        try {
            await apiClient.post('/users', user);
            setError(null);
            alert('register succeeded');
            navigate('/login');
            
        } catch (error_) {
            console.error("DEBUG::Register.tsx::", error_);
            setError('register failed');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.registerBox}>
                <p className={styles.title}>Project MN Register</p>
                <p className={styles.inputPlaceholder}>Email</p>
                <input 
                    className={styles.inputBox}
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
                <p className={styles.inputPlaceholder}>Password</p>
                <input 
                    className={styles.inputBox}
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <p className={styles.inputPlaceholder}>Username</p>
                <input 
                    className={styles.inputBox}
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
                {error && <p className={styles.error}>{error}</p>}
                <button className={styles.button} onClick={handleSubmit}>Register</button>
            </div>
        </div>
    );
};

export default Register;