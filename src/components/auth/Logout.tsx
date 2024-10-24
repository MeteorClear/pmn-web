import React from "react";
import { useNavigate } from "react-router-dom";

interface LogoutProps {
    onLogout: () => void;
}

const Logout = ({ onLogout }: LogoutProps) => {
    const navigate = useNavigate();

    // 로그아웃시 데이터 삭제
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        
        onLogout();
        alert('logout succeeded');
        navigate('/login');
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;