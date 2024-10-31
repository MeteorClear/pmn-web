import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Logout.module.css';

/**
 * Logout 컴포넌트의 props 정의.
 */
interface LogoutProps {
    onLogout: () => void;
}

/**
 * 로그아웃 컴포넌트.
 * 로그인 정보와 토큰 저장.
 * 
 * @component
 * @param {LogoutProps} props 로그아웃 기능을 포함한 props
 * @returns {JSX.Element} Logout 컴포넌트
 */
const Logout = ({ onLogout }: LogoutProps) => {
    const navigate = useNavigate();

    /**
     * 로그아웃 처리 함수.
     * 로그인시 저장된 토큰과 사용자 정보 제거.
     * 성공시 로그인 페이지로 이동.
     */
    const handleLogout = () => {
        const confirmDelete = window.confirm('Do you really want to Logout?');
        if (!confirmDelete) return;

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        
        // App.tsx 로그인 여부 설정.
        onLogout();

        alert('logout succeeded');
        navigate('/login');
    };

    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;