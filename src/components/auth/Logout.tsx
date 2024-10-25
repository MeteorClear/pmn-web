import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Logout.module.css';

interface LogoutProps {
    onLogout: () => void;
}

const Logout = ({ onLogout }: LogoutProps) => {
    const navigate = useNavigate();

    // 로그아웃시 데이터 삭제
    const handleLogout = () => {
        const confirmDelete = window.confirm('Do you really want to Logout?');
        if (!confirmDelete) return;

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        
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