import React from "react";

interface LogoutProps {
    onLogout: () => void;
}

const Logout = ({ onLogout }: LogoutProps) => {

    // 로그아웃시 데이터 삭제
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        onLogout();
        alert('logout succeeded');
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;