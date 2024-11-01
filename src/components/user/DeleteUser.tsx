import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './DeleteUser.module.css';

/**
 * 사용자 삭제 컴포넌트.
 * 사용자 계성 삭제 요청 및 처리 담당.
 * 
 * @component
 * @returns {JSX.Element} DeleteUser 컴포넌트.
 */
const DeleteUser = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        /**
         * 저장된 사용자 ID를 불러오는 함수.
         * 정보가 없는 경우 로그인 페이지로 이동.
         * 
         * @async
         */
        const fetchUser = async () => {
            const storedUserId = localStorage.getItem('userId')
            if (!storedUserId) {
                alert('User load failed, please relogin');
                console.error('[ERROR] DeleteUser.tsx:: no userId found');
                navigate('/login');
                return;
            }

            setUserId(Number(storedUserId));
        };
        fetchUser();
    }, [userId, navigate]);

    /**
     * 삭제 요청 처리 함수.
     * `/users/${userId}` 에 delete 요청.
     * 
     * @async
     */
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Do you really want to delete?');
        if (!confirmDelete) return;

        try {
            await apiClient.delete(`/users/${userId}`);
            setError(null);
        } catch (error_) {
            console.error("[ERROR] DeleteNote.tsx ::", error);
            setError("user delete failed");
        }
    }

    /**
     * 메인 페이지로 돌아가는 함수.
     */
    const handleBackToMain = () => {
        const currentPath = location.pathname;
        const cutPosition = currentPath.substring(0, currentPath.lastIndexOf('/'));
        const parentPath = cutPosition.substring(0, cutPosition.lastIndexOf('/'));
        navigate(parentPath);
    }

    return (
        <div className={styles.container}>
            <div className={styles.deleteBox}>
                <p className={styles.title}>Delete User</p>
                <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
                {error && <p className={styles.error}>{error}</p>}
                <button className={styles.button} onClick={handleBackToMain}>Back</button>
            </div>
        </div>
    );
};

export default DeleteUser;